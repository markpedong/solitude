package controllers

import (
	"net/http"
	"solitude/database"
	"solitude/helpers"
	"solitude/models"

	"github.com/gin-gonic/gin"
)

func AddToCart(ctx *gin.Context) {
	type Variation struct {
		ID    string `json:"variation_id"`
		Value string `json:"value"`
	}

	var cartItem struct {
		ProductID string      `json:"product_id" validate:"required"`
		UserID    string      `json:"user_id" validate:"required"`
		Variation []Variation `json:"variation" validate:"required"`
	}
	if err := helpers.BindValidateJSON(ctx, &cartItem); err != nil {
		return
	}

	var foundUser models.User
	if err := database.DB.Preload("Cart").First(&foundUser, "id = ?", cartItem.UserID).Error; err != nil {
		helpers.ErrJSONResponse(ctx, http.StatusNotFound, "User not found")
		return
	}

	var userProduct models.Product
	if err := database.DB.First(&userProduct, "product_id = ?", cartItem.ProductID).Error; err != nil {
		helpers.ErrJSONResponse(ctx, http.StatusNotFound, "Product not found")
		return
	}

	var varIds []string
	for _, v := range cartItem.Variation {
		varIds = append(varIds, v.ID)
	}

	var variations models.ProductVariations
	// create nested variation, value will consist of value and id.
	if err := database.DB.Where(varIds).Find(&variations).Error; err != nil {
		helpers.ErrJSONResponse(ctx, http.StatusInternalServerError, err.Error())
		return
	}

	// need to add a logic to check if the certain variation already exist
	// - create another relationship between user and product which includes qty, variation and id of product and user id.
	// for _, v := range foundUser.Cart {
	// 	if v.ProductID == userProduct.ProductID {
	// 		helpers.ErrJSONResponse(ctx, http.StatusNotFound, "Product already exist!, add quantity")
	// 		return
	// 	}
	// }

	// if err := database.DB.Model(&foundUser).Association("Cart").Append(&userProduct); err != nil {
	// 	helpers.ErrJSONResponse(ctx, http.StatusInternalServerError, "Failed to add product to cart")
	// 	return
	// }

	helpers.JSONResponse(ctx, "added to cart successfully", helpers.DataHelper(variations))
}

func RemoveItemFromCart(ctx *gin.Context) {
	var ids struct {
		ProductID string `json:"product_id" validate:"required"`
		UserID    string `json:"user_id" validate:"required"`
	}
	if err := helpers.BindValidateJSON(ctx, &ids); err != nil {
		return
	}

	var foundUser models.User
	if err := database.DB.Preload("Cart").First(&foundUser, "id = ?", ids.UserID).Error; err != nil {
		helpers.ErrJSONResponse(ctx, http.StatusNotFound, "User not found")
		return
	}

	var userProduct models.Product
	if err := database.DB.First(&userProduct, "product_id = ?", ids.ProductID).Error; err != nil {
		helpers.ErrJSONResponse(ctx, http.StatusNotFound, "Product not found")
		return
	}

	if err := database.DB.Model(&foundUser).Association("Cart").Delete(userProduct); err != nil {
		helpers.ErrJSONResponse(ctx, http.StatusInternalServerError, err.Error())
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

	if body.UserID == "" {
		helpers.ErrJSONResponse(ctx, http.StatusBadRequest, "invalid id passed!")
		return
	}

	var foundUser models.User
	if err := database.DB.Preload("Cart.Variations").First(&foundUser, "id = ? ", body.UserID).Error; err != nil {
		helpers.ErrJSONResponse(ctx, http.StatusInternalServerError, err.Error())
		return
	}

	ids := []models.JSONProduct{}
	for _, v := range foundUser.Cart {
		ids = append(ids, models.JSONProduct{
			ID:          v.ProductID,
			ProductName: v.ProductName,
			Variations:  v.Variations,
			Category:    v.Category,
		})
	}

	helpers.JSONResponse(ctx, "fetched items from cart", helpers.DataHelper(ids))
}

func BuyFromCart(ctx *gin.Context) {
	var ids struct {
		ProductIDs string `json:"product_ids" validate:"required"`
		UserID     string `json:"user_id" validate:"required"`
	}
	if err := helpers.BindValidateJSON(ctx, &ids); err != nil {
		return
	}

	ctx.JSON(http.StatusOK, gin.H{
		"success": false,
		"status":  http.StatusOK,
		"message": "successfully placed the order!",
	})
}

func InstantBuy(ctx *gin.Context) {
	var ids struct {
		ProductID string `json:"product_id" validate:"required"`
		UserID    string `json:"user_id" validate:"required"`
	}
	if err := helpers.BindValidateJSON(ctx, &ids); err != nil {
		return
	}

	helpers.JSONResponse(ctx, "")
}
