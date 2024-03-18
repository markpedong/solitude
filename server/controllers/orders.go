package controllers

import (
	"net/http"
	"solitude/database"
	"solitude/helpers"
	"solitude/models"

	"github.com/gin-gonic/gin"
)

func CheckoutOrder(ctx *gin.Context) {
	var body struct {
		CheckoutIDs   []string `json:"checkout_ids" validate:"required"`
		DeliveryID    string   `json:"delivery_id" vaidate:"required"`
		PaymentMethod int      `json:"payment_method" validate:"required"`
	}
	if err := helpers.BindValidateJSON(ctx, &body); err != nil {
		return
	}

	var currOrder []models.Carts
	if err := database.DB.Where("id IN ?", body.CheckoutIDs).Find(&currOrder).Error; err != nil {
		helpers.ErrJSONResponse(ctx, http.StatusInternalServerError, err.Error())
		return
	}

	existingIDs := make(map[string]bool)
	for _, q := range currOrder {
		existingIDs[q.ID] = true
	}

	for _, v := range body.CheckoutIDs {
		if _, ok := existingIDs[v]; !ok {
			helpers.ErrJSONResponse(ctx, http.StatusBadRequest, "check ids passed")
			return
		}
	}

	var orderArr []models.Orders
	groupID := helpers.NewUUID()
	for _, v := range currOrder {
		var currProd models.Product
		if err := database.DB.Find(&currProd, "product_id = ?", v.ProductID).Error; err != nil {
			helpers.ErrJSONResponse(ctx, http.StatusInternalServerError, err.Error())
			return
		}
		var sellerData models.Seller
		if err := database.DB.Find(&sellerData, "seller_id = ?", currProd.SellerID).Error; err != nil {
			helpers.ErrJSONResponse(ctx, http.StatusInternalServerError, err.Error())
			return
		}

		newOrder := models.Orders{
			OrderID:         helpers.NewUUID(),
			ProductID:       v.ProductID,
			UserID:          v.UserID,
			VariationIDs:    v.VariationIDs,
			Price:           int(currProd.Price * float64(v.Quantity)),
			SelectedAddress: body.DeliveryID,
			PaymentMethod:   body.PaymentMethod,
			Discount:        &currProd.Discount,
			Quantity:        v.Quantity,
			Status:          1,
			SellerName:      sellerData.SellerName,
			SellerID:        sellerData.SellerID,
			GroupID:         groupID,
		}

		currProd.Stock = currProd.Stock - 1
		database.DB.Save(&currProd)
		orderArr = append(orderArr, newOrder)
	}

	if err := database.DB.Create(&orderArr).Error; err != nil {
		helpers.ErrJSONResponse(ctx, http.StatusInternalServerError, err.Error())
		return
	}

	if err := database.DB.Delete(&currOrder, body.CheckoutIDs).Error; err != nil {
		helpers.ErrJSONResponse(ctx, http.StatusInternalServerError, err.Error())
		return
	}

	helpers.JSONResponse(ctx, "ordered successfully")
}

func GetOrders(ctx *gin.Context) {
	var body struct {
		ID      string `json:"id" validate:"required"`
		GroupID string `json:"group_id"`
	}
	if err := helpers.BindValidateJSON(ctx, &body); err != nil {
		return
	}

	var currOrders []models.Orders
	if err := database.DB.Order("created_at DESC").Where("user_id = ?", body.ID).Find(&currOrders).Error; err != nil {
		helpers.ErrJSONResponse(ctx, http.StatusInternalServerError, err.Error())
		return
	}

	var productsWithVariations []models.OrderResponse
	for _, cart := range currOrders {
		// If a group_id is passed and it doesn't match the current order's group_id, skip this order
		if body.GroupID != "" && body.GroupID != cart.GroupID {
			continue
		}

		var product models.Product
		if err := database.DB.Find(&product, "product_id = ?", cart.ProductID).Error; err != nil {
			helpers.ErrJSONResponse(ctx, http.StatusInternalServerError, err.Error())
			return
		}

		var variations []models.ProductVariations
		if err := database.DB.Find(&variations, "product_id = ?", product.ProductID).Error; err != nil {
			helpers.ErrJSONResponse(ctx, http.StatusInternalServerError, err.Error())
			return
		}

		for i, variation := range variations {
			var values []models.VariationValue
			for _, variationID := range cart.VariationIDs {
				var value models.VariationValue
				if err := database.DB.Find(&value, "id = ? AND variation_id = ?", variationID, variation.ID).Error; err != nil {
					helpers.ErrJSONResponse(ctx, http.StatusInternalServerError, err.Error())
					return
				}

				if value.ID != "" {
					values = append(values, value)
				}

			}

			if len(values) > 0 {
				variations[i].SelectedValue = values[0].Value
			} else {
				variations[i].SelectedValue = ""
			}
		}

		productRes := models.OrderResponse{
			OrderID:       cart.OrderID,
			ProductID:     product.ProductID,
			SellerID:      product.SellerID,
			ProductName:   product.ProductName,
			Price:         int(product.Price),
			Image:         product.Image,
			Variations:    variations,
			Discount:      &product.Discount,
			DiscountPrice: product.DiscountPrice,
			Quantity:      cart.Quantity,
			Status:        cart.Status,
			SellerName:    cart.SellerName,
			GroupID:       cart.GroupID,
		}
		productsWithVariations = append(productsWithVariations, productRes)
	}

	// Create a map to group the orders by GroupID
	groupedOrders := make(map[string][]models.OrderResponse)

	for _, productRes := range productsWithVariations {
		groupedOrders[productRes.GroupID] = append(groupedOrders[productRes.GroupID], productRes)
	}

	// Create a new struct to hold the grouped orders and their count
	type GroupedOrderResponse struct {
		GroupID string                 `json:"group_id"`
		Orders  []models.OrderResponse `json:"orders"`
		Count   int                    `json:"count"`
	}

	var groupedOrderResponses []GroupedOrderResponse

	// Populate the new struct with the grouped orders and their count
	for groupID, orders := range groupedOrders {
		groupedOrderResponses = append(groupedOrderResponses, GroupedOrderResponse{
			GroupID: groupID,
			Orders:  orders,
			Count:   len(orders),
		})
	}

	// Return the grouped orders
	helpers.JSONResponse(ctx, "", helpers.DataHelper(groupedOrderResponses))
}
