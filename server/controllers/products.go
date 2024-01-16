package controllers

import (
	"net/http"
	"solitude/database"
	"solitude/helpers"
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

	product := &models.LandingProduct{
		ProductID:   uuid.New(),
		ProductName: &body.ProductName,
		Price:       body.Price,
		Image:       &body.Image,
		Description: body.Description,
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
	var body struct {
		Material string `json:"material"`
		Price    int    `json:"price"`
	}

	if err := ctx.ShouldBindJSON(&body); err != nil {
		helpers.ErrJsonResponse(ctx, http.StatusBadRequest, err.Error())
		return
	}

	var productList []models.LandingProduct
	if err := database.DB.Order("created_at DESC").Find(&productList).Error; err != nil {
		helpers.ErrJsonResponse(ctx, http.StatusInternalServerError, err.Error())
		return
	}

	ctx.JSON(http.StatusOK, gin.H{
		"message": "success",
		"data":    productList,
		"success": true,
		"status":  http.StatusOK,
	})
}

func GetProductsByID(ctx *gin.Context) {
	id := ctx.Param("id")

	var product models.LandingProduct
	if err := database.DB.Where("ID = ?", id).First(&product).Error; err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"message": err.Error(),
			"status":  http.StatusInternalServerError,
			"success": false,
		})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{
		"data":    product,
		"success": true,
		"message": "successfully got the product details!!",
		"status":  http.StatusOK,
	})
}
