package controllers

import (
	"net/http"
	"solitude/database"
	"solitude/helpers"
	"solitude/models"

	"github.com/gin-gonic/gin"
)

func AddToCart(ctx *gin.Context) {
	var cartItem struct {
		ProductID    string   `json:"product_id" validate:"required"`
		UserID       string   `json:"user_id" validate:"required"`
		VariationIDs []string `json:"variation_ids" validate:"required"`
		Quantity     int      `json:"quantity" validate:"required"`
	}
	if err := helpers.BindValidateJSON(ctx, &cartItem); err != nil {
		return
	}

	var foundUser models.User
	if err := database.DB.First(&foundUser, "id = ?", cartItem.UserID).Error; err != nil {
		helpers.ErrJSONResponse(ctx, http.StatusNotFound, err.Error())
		return
	}

	var selectedProduct models.Product
	if err := database.DB.Preload("Variations.Value").First(&selectedProduct, "product_id = ?", cartItem.ProductID).Error; err != nil {
		helpers.ErrJSONResponse(ctx, http.StatusNotFound, "product not found")
		return
	}

	var selectedVariations []models.VariationValue
	if err := database.DB.
		Where("id IN ?", cartItem.VariationIDs).
		Find(&selectedVariations).Error; err != nil {
		helpers.ErrJSONResponse(ctx, http.StatusNotFound, "variation not found")
		return
	}

	newCartItem := models.Carts{
		ID:           helpers.NewUUID(),
		ProductID:    selectedProduct.ProductID,
		UserID:       foundUser.ID,
		VariationIDs: cartItem.VariationIDs,
		Quantity:     cartItem.Quantity,
	}

	if err := database.DB.Create(&newCartItem).Error; err != nil {
		helpers.ErrJSONResponse(ctx, http.StatusInternalServerError, err.Error())
		return
	}

	helpers.JSONResponse(ctx, "added to cart successfully")
}

func RemoveItemFromCart(ctx *gin.Context) {
	var body struct {
		UserID     string `json:"user_id"`
		CheckoutID string `json:"checkout_id"`
	}
	if err := helpers.BindValidateJSON(ctx, &body); err != nil {
		return
	}

	var userCart []models.Carts
	if err := database.DB.Find(&userCart, "user_id = ? ", body.UserID).Error; err != nil {
		helpers.ErrJSONResponse(ctx, http.StatusInternalServerError, err.Error())
		return
	}

	if err := database.DB.Delete(&models.Carts{}, "id = ?", body.CheckoutID).Error; err != nil {
		helpers.ErrJSONResponse(ctx, http.StatusInternalServerError, err.Error())
		return
	}

	helpers.JSONResponse(ctx, "removed from cart successfully!")
}

func GetItemsFromCart(ctx *gin.Context) {
	var body struct {
		UserID string `json:"user_id"`
	}
	if err := helpers.BindValidateJSON(ctx, &body); err != nil {
		return
	}

	var userCart []models.Carts
	if err := database.DB.Order("created_at DESC").Find(&userCart, "user_id = ? ", body.UserID).Error; err != nil {
		helpers.ErrJSONResponse(ctx, http.StatusInternalServerError, err.Error())
		return
	}

	var cartResponse []models.CartResponse
	for _, cart := range userCart {
		var product models.Product
		if err := database.DB.Find(&product, "product_id = ?", cart.ProductID).Error; err != nil {
			helpers.ErrJSONResponse(ctx, http.StatusInternalServerError, err.Error())
			return
		}

		var seller models.Seller
		if err := database.DB.Find(&seller, "seller_id = ?", product.SellerID).Error; err != nil {
			helpers.ErrJSONResponse(ctx, http.StatusInternalServerError, err.Error())
			return
		}

		var variations []models.ProductVariations
		if err := database.DB.Find(&variations, "product_id = ?", product.ProductID).Error; err != nil {
			return
		}

		for i, variation := range variations {
			var values []models.VariationValue
			for _, variationID := range cart.VariationIDs {
				var value models.VariationValue
				if err := database.DB.Find(&value, "id = ? AND variation_id = ?", variationID, variation.ID).Error; err != nil {
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

		productRes := models.JSONProductCart{
			ProductID:     product.ProductID,
			ProductName:   product.ProductName,
			Price:         product.Price * float64(cart.Quantity),
			Image:         product.Image[0],
			Variations:    labVal,
			CheckoutID:    cart.ID,
			Quantity:      cart.Quantity,
			Discount:      product.Discount,
			DiscountPrice: product.DiscountPrice,
		}

		found := false
		for i, v := range cartResponse {
			if v.SellerID == seller.SellerID {
				found = true
				cartResponse[i].Products = append(cartResponse[i].Products, productRes)
				break
			}
		}

		// If seller not found, create a new entry in cartResponse
		if !found {
			cartResponse = append(cartResponse, models.CartResponse{
				SellerName: seller.SellerName,
				SellerID:   seller.SellerID,
				Products:   []models.JSONProductCart{productRes},
			})
		}
	}

	helpers.JSONResponse(ctx, "fetched items from cart", helpers.DataHelper(cartResponse))
}
