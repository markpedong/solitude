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
		UserID        string `json:"user_id" validate:"required"`
		DeliveryID    string `json:"delivery_id" vaidate:"required"`
		PaymentMethod int    `json:"payment_method" validate:"required"`
	}
	if err := helpers.BindValidateJSON(ctx, &body); err != nil {
		return
	}

	var user models.User
	if err := database.DB.Preload("Carts").First(&user, "id = ?", body.UserID).Error; err != nil {
		helpers.ErrJSONResponse(ctx, http.StatusInternalServerError, err.Error())
		return
	}

	var orderGroup models.OrderGroup
	orderGroup.ID = helpers.NewUUID()
	orderGroup.SelectedAddress = body.DeliveryID
	orderGroup.PaymentMethod = body.PaymentMethod
	orderGroup.Status = 1
	for _, v := range user.Carts {
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
			OrderID:      helpers.NewUUID(),
			ProductID:    v.ProductID,
			UserID:       v.UserID,
			VariationIDs: v.VariationIDs,
			Price:        int(currProd.Price * float64(v.Quantity)),
			Discount:     &currProd.Discount,
			Quantity:     v.Quantity,
			SellerName:   sellerData.SellerName,
			SellerID:     sellerData.SellerID,
			GroupID:      orderGroup.ID,
		}

		currProd.Stock = currProd.Stock - 1
		database.DB.Save(&currProd)
		orderGroup.Orders = append(orderGroup.Orders, newOrder)
	}
	if err := database.DB.Create(&orderGroup).Error; err != nil {
		helpers.ErrJSONResponse(ctx, http.StatusInternalServerError, err.Error())
		return
	}

	if err := database.DB.Delete(&user.Carts).Error; err != nil {
		helpers.ErrJSONResponse(ctx, http.StatusInternalServerError, err.Error())
		return
	}

	helpers.JSONResponse(ctx, "ordered successfully")
}

func GetOrders(ctx *gin.Context) {
	var body struct {
		ID string `json:"id" validate:"required"`
	}
	if err := helpers.BindValidateJSON(ctx, &body); err != nil {
		return
	}

	var currOrders []models.Orders
	if err := database.DB.Order("created_at DESC").Where("user_id = ?", body.ID).Find(&currOrders).Error; err != nil {
		helpers.ErrJSONResponse(ctx, http.StatusInternalServerError, err.Error())
		return
	}

	productsWithVariations, err := GetProductsWithVariations(currOrders)
	if err != nil {
		helpers.ErrJSONResponse(ctx, http.StatusInternalServerError, err.Error())
		return
	}

	groupedOrders := make(map[string][]models.OrderResponse)
	for _, productRes := range productsWithVariations {
		groupedOrders[productRes.GroupID] = append(groupedOrders[productRes.GroupID], productRes)
	}

	var groupedOrderResponses []models.GroupedOrderResponse
	for _, orders := range groupedOrders {
		groupedOrderResponses = append(groupedOrderResponses, models.GroupedOrderResponse{
			OrderResponse: orders[0],
			Count:         len(orders),
		})
	}

	helpers.JSONResponse(ctx, "", helpers.DataHelper(groupedOrderResponses))
}

func GetOrdersByGroupID(ctx *gin.Context) {
	var body struct {
		GroupID string `json:"group_id" validate:"required"`
	}
	if err := helpers.BindValidateJSON(ctx, &body); err != nil {
		return
	}

	var currOrderGroup models.OrderGroup
	if err := database.DB.Preload("Orders").Where("id = ?", body.GroupID).Find(&currOrderGroup).Error; err != nil {
		helpers.ErrJSONResponse(ctx, http.StatusInternalServerError, err.Error())
		return
	}

	var info models.DeliveryInformation
	if err := database.DB.First(&info, "id = ?", currOrderGroup.SelectedAddress).Error; err != nil {
		helpers.ErrJSONResponse(ctx, http.StatusInternalServerError, err.Error())
		return
	}

	productsWithVariations, err := GetProductsWithVariations(currOrderGroup.Orders)
	if err != nil {
		helpers.ErrJSONResponse(ctx, http.StatusInternalServerError, err.Error())
		return
	}
	productMap := GroupProductsBySeller(productsWithVariations)
	resp := map[string]interface{}{
		"products":       productMap,
		"address":        info,
		"payment_method": currOrderGroup.PaymentMethod,
		"time": map[string]interface{}{
			"shipped_at":   currOrderGroup.ShippedAt,
			"delivered_at": currOrderGroup.DeliveredAt,
			"completed_at": currOrderGroup.CompletedAt,
			"created_at":   currOrderGroup.CreatedAt,
		},
		"status": currOrderGroup.Status,
	}

	helpers.JSONResponse(ctx, "", helpers.DataHelper(resp))
}

// Group products with variations by seller into an array of objects
func GroupProductsBySeller(productsWithVariations []models.OrderResponse) []map[string]interface{} {
	productMap := make(map[string][]models.OrderResponse)

	// Group products by seller
	for _, product := range productsWithVariations {
		sellerName := product.SellerName
		productMap[sellerName] = append(productMap[sellerName], product)
	}

	// Convert map to array of objects
	var result []map[string]interface{}
	for sellerName, products := range productMap {
		sellerID := products[0].SellerID // Assuming all products from the same seller have the same ID
		sellerProducts := map[string]interface{}{
			"seller_name": sellerName,
			"seller_id":   sellerID,
			"products":    products,
		}
		result = append(result, sellerProducts)
	}

	return result
}

func GetProductsWithVariations(currOrders []models.Orders) ([]models.OrderResponse, error) {
	var productsWithVariations []models.OrderResponse

	for _, cart := range currOrders {
		var product models.Product
		if err := database.DB.Find(&product, "product_id = ?", cart.ProductID).Error; err != nil {
			return nil, err
		}

		var variations []models.ProductVariations
		if err := database.DB.Find(&variations, "product_id = ?", product.ProductID).Error; err != nil {
			return nil, err
		}

		for i, variation := range variations {
			var values []models.VariationValue
			for _, variationID := range cart.VariationIDs {
				var value models.VariationValue
				if err := database.DB.Find(&value, "id = ? AND variation_id = ?", variationID, variation.ID).Error; err != nil {
					return nil, err
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

		var labVal []models.LabVal
		for _, v := range variations {
			var q models.LabVal

			q.Label = v.Label
			q.Value = v.SelectedValue

			if v.SelectedValue == "" {
				continue
			}

			labVal = append(labVal, q)
		}

		productRes := models.OrderResponse{
			OrderID:       cart.OrderID,
			ProductID:     product.ProductID,
			SellerID:      product.SellerID,
			ProductName:   product.ProductName,
			Price:         int(product.Price),
			Image:         product.Image[0],
			Variations:    labVal,
			Discount:      &product.Discount,
			DiscountPrice: product.DiscountPrice,
			Quantity:      cart.Quantity,
			SellerName:    cart.SellerName,
			GroupID:       cart.GroupID,
		}
		productsWithVariations = append(productsWithVariations, productRes)
	}

	return productsWithVariations, nil
}
