package controllers

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func AddToCart(ctx *gin.Context) {
	var ids struct {
		ProductID string `json:"product_id" validate:"required"`
		UserID    string `json:"user_id" validate:"required"`
	}
	//https://www.youtube.com/watch?v=iuoAkFoCtOc 10:19
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

	ctx.JSON(http.StatusBadRequest, gin.H{
		"data":    ids,
		"success": false,
		"status":  http.StatusBadRequest,
	})
}
func RemoveItem(ctx *gin.Context)   {}
func CartCheckout(ctx *gin.Context) {}
func InstantBuy(ctx *gin.Context)   {}
