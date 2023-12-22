package controllers

import (
	"net/http"
	"solitude/database"
	"solitude/models"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

func AddProducts(ctx *gin.Context) {
	var body struct {
		ProductName string   `json:"product_name" validate:"required"`
		Description string   `json:"description" validate:"required"`
		Price       *float64 `json:"price" validate:"required"`
		// we will change this to upload file
		Image string `json:"image" validate:"required"`
	}

	if err := ctx.ShouldBindJSON(&body); err != nil {
		ctx.AbortWithStatusJSON(http.StatusBadRequest, gin.H{
			"message": err.Error(),
			"status":  http.StatusBadRequest,
			"success": "failed",
		})
		return
	}

	product := &models.Product{
		ProductID:   uuid.New(),
		ProductName: &body.ProductName,
		Price:       body.Price,
		Rating:      nil,
		Image:       &body.Image,
	}

	if err := database.DB.Create(&product).Error; err != nil {
		ctx.AbortWithStatusJSON(http.StatusBadRequest, gin.H{
			"message": err.Error(),
			"status":  http.StatusBadRequest,
			"success": "failed",
		})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{
		"message": "successfully added product",
		"success": true,
		"status":  http.StatusOK,
	})
}

func GetAllProducts(ctx *gin.Context) {
	var productList []models.Product

	if database.DB.Order("created_at DESC").Find(&productList).Error != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"message": "There's a problem getting the products data",
			"success": false,
		})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{
		"message": "success",
		"data":    productList,
		"success": true,
		"status":  http.StatusOK,
	})
}
