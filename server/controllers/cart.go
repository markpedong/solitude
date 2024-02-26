package controllers

import (
	"log"
	"net/http"
	"solitude/database"
	"solitude/helpers"
	"solitude/models"

	"github.com/gin-gonic/gin"
)

func AddToCart(ctx *gin.Context) {
	var ids struct {
		ProductID string `json:"product_id" validate:"required"`
		UserID    string `json:"user_id" validate:"required"`
	}

	if err := ctx.ShouldBindJSON(&ids); err != nil {
		helpers.ErrJSONResponse(ctx, http.StatusBadRequest, "Invalid JSON input")
		return
	}

	if err := Validate.Struct(ids); err != nil {
		helpers.ErrJSONResponse(ctx, http.StatusBadRequest, err.Error())
		return
	}

	var foundUser models.User
	if err := database.DB.Table("user").Where("id = ?", ids.UserID).First(&foundUser).Error; err != nil {
		helpers.ErrJSONResponse(ctx, http.StatusInternalServerError, err.Error())
		return
	}

	// ADD TO CART DATABASE QUERY IS NOT YET IMPLEMENTED
	helpers.JSONResponse(ctx, "added to cart successfully", helpers.DataHelper(foundUser))
}

func RemoveItem(ctx *gin.Context) {
	var ids struct {
		ProductID string `json:"product_id" validate:"required"`
		UserID    string `json:"user_id" validate:"required"`
	}

	if err := ctx.ShouldBindJSON(&ids); err != nil {
		ctx.AbortWithStatusJSON(http.StatusBadRequest, gin.H{
			"message": "Invalid JSON input",
			"success": false,
			"status":  http.StatusBadRequest,
		})
		return
	}

	if err := Validate.Struct(ids); err != nil {
		ctx.AbortWithStatusJSON(http.StatusBadRequest, gin.H{
			"message": err.Error(),
			"success": false,
			"status":  http.StatusBadRequest,
		})
		return
	}

	// REMOVE FROM CART DATABASE QUERY IS NOT YET IMPLEMENTED

	ctx.JSON(http.StatusOK, gin.H{
		"success": false,
		"status":  http.StatusOK,
		"message": "removed from cart successfully!",
	})
}

func GetItemFromCart(ctx *gin.Context) {
	var body struct {
		UserID string `json:"user_id"`
	}

	if body.UserID == "" {
		ctx.Header("Content-Type", "application/json")
		ctx.JSON(http.StatusNotFound, gin.H{
			"message": "invalid id",
			"status":  http.StatusNotFound,
			"success": false,
		})
		return
	}

	var filledcart models.User

	err := database.DB.First(&filledcart, body.UserID).Error
	if err != nil {
		log.Println(err)
		ctx.IndentedJSON(500, "not id found")
		return
	}

	var totalSum uint64
	err = database.DB.Model(&models.User{}).
		Where("id = ?", body.UserID).
		Select("sum(usercart.price) as total").
		Scan(&totalSum).
		Error

	if err != nil {
		log.Println(err)
		ctx.AbortWithStatus(http.StatusInternalServerError)
		return
	}

	ctx.IndentedJSON(200, gin.H{
		"total": totalSum,
		// "userCart": filledcart.UserCart,
	})

}

func BuyFromCart(ctx *gin.Context) {
	var ids struct {
		ProductIDs string `json:"product_ids" validate:"required"`
		UserID     string `json:"user_id" validate:"required"`
	}

	if err := ctx.ShouldBindJSON(&ids); err != nil {
		ctx.AbortWithStatusJSON(http.StatusBadRequest, gin.H{
			"message": "Invalid JSON input",
			"success": false,
			"status":  http.StatusBadRequest,
		})
		return
	}

	if err := Validate.Struct(ids); err != nil {
		ctx.AbortWithStatusJSON(http.StatusBadRequest, gin.H{
			"message": err.Error(),
			"success": false,
			"status":  http.StatusBadRequest,
		})
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

	if err := ctx.ShouldBindJSON(&ids); err != nil {
		ctx.AbortWithStatusJSON(http.StatusBadRequest, gin.H{
			"message": "Invalid JSON input",
			"success": false,
			"status":  http.StatusBadRequest,
		})
		return
	}

	if err := Validate.Struct(ids); err != nil {
		ctx.AbortWithStatusJSON(http.StatusBadRequest, gin.H{
			"message": err.Error(),
			"success": false,
			"status":  http.StatusBadRequest,
		})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{
		"success": false,
		"status":  http.StatusOK,
		"message": "successfully placed the order!",
	})
}
