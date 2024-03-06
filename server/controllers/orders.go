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
		AddressID     string   `json:"address_id" vaidate:"required"`
		PaymentMethod int      `json:"payment_method" validate:"required"`
		Discount      *int     `json:"discount"`
	}
	if err := helpers.BindValidateJSON(ctx, &body); err != nil {
		return
	}

	var currOrder []models.Carts
	if err := database.DB.Find(&currOrder, "id = ?", body.CheckoutIDs).Error; err != nil {
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
	for _, v := range currOrder {
		var currProd models.Product
		if err := database.DB.Find(&currProd, "product_id = ?", v.ProductID).Error; err != nil {
			helpers.ErrJSONResponse(ctx, http.StatusInternalServerError, err.Error())
			return
		}

		newOrder := models.Orders{
			OrderID:         helpers.NewUUID(),
			ProductID:       v.ProductID,
			UserID:          v.UserID,
			VariationIDs:    v.VariationIDs,
			Price:           int(currProd.Price),
			SelectedAddress: body.AddressID,
			PaymentMethod:   body.PaymentMethod,
			Discount:        body.Discount,
		}

		orderArr = append(orderArr, newOrder)
	}

	if err := database.DB.Create(&orderArr).Error; err != nil {
		helpers.ErrJSONResponse(ctx, http.StatusInternalServerError, err.Error())
		return
	}

	helpers.JSONResponse(ctx, "ordered successfully")
}

func GetOrders(ctx *gin.Context) {
	var body struct {
		ID string `json:"id"`
	}
	if err := helpers.BindValidateJSON(ctx, &body); err != nil {
		return
	}

	var currOrders []models.Carts
	if err := database.DB.Where("user_id = ? AND ordered = ?", body.ID, true).Find(&currOrders).Error; err != nil {
		helpers.ErrJSONResponse(ctx, http.StatusInternalServerError, err.Error())
		return
	}

	var productsWithVariations []models.JSONProduct
	for _, cart := range currOrders {
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
			variations[i].Value = values
		}

		// product.Variations = variations
		// product.CheckoutID = cart.ID
		productRes := models.JSONProduct{
			ProductID:   product.ProductID,
			SellerID:    product.SellerID,
			ProductName: product.ProductName,
			Price:       product.Price,
			Image:       product.Image,
			Variations:  variations,
			CheckoutID:  cart.ID,
		}
		productsWithVariations = append(productsWithVariations, productRes)
	}

	helpers.JSONResponse(ctx, "", helpers.DataHelper(productsWithVariations))
}
