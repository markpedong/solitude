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
	}

	if err := database.DB.Create(&newCartItem).Error; err != nil {
		helpers.ErrJSONResponse(ctx, http.StatusInternalServerError, err.Error())
		return
	}

	helpers.JSONResponse(ctx, "added to cart successfully", helpers.DataHelper(selectedVariations))
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

	var userCart []models.Carts
	if err := database.DB.Find(&userCart, "user_id = ? ", body.UserID).Error; err != nil {
		helpers.ErrJSONResponse(ctx, http.StatusInternalServerError, err.Error())
		return
	}

	helpers.JSONResponse(ctx, "fetched items from cart", helpers.DataHelper(userCart))
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
