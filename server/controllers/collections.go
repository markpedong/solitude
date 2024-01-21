package controllers

import (
	"net/http"
	"solitude/database"
	"solitude/models"

	"github.com/gin-gonic/gin"
)

func GetAllCollections(ctx *gin.Context) {
	var products []models.Product

	if database.DB.
		Order("created_at DESC").
		Select("description, image, product_name, id, created_at").
		Find(&products).Error != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"message": "There's a problem getting the blog data",
			"success": false,
		})
		return
	}

	var responseProducts []models.Collections
	for _, product := range products {
		responseProduct := models.Collections{
			ID:          product.ProductID,
			Title:       *product.ProductName,
			Image:       *product.Image,
			CreatedAt:   product.CreatedAt,
			Description: product.Description,
		}
		responseProducts = append(responseProducts, responseProduct)
	}

	ctx.JSON(http.StatusOK, gin.H{
		"message": "success",
		"data":    responseProducts,
		"success": true,
		"status":  http.StatusOK,
	})
}

func AddCollection(ctx *gin.Context) {
	var body struct {
		Title       string `json:"title" validate:"required"`
		Description string `json:"description" validate:"required"`
		Image       string `json:"image" validate:"required"`
	}

	if err := ctx.ShouldBindJSON(&body); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"message": err.Error(),
			"success": false,
			"status":  http.StatusBadRequest,
		})

		return
	}

	if err := Validate.Struct(body); err != nil {
		ctx.AbortWithStatusJSON(http.StatusBadRequest, gin.H{
			"message": err.Error(),
			"status":  http.StatusBadRequest,
			"success": false,
		})

		return
	}

	blog := &models.Collections{
		ID:          Guid.String(),
		Title:       body.Title,
		Description: body.Description,
		Image:       body.Image,
	}
	if err := database.DB.Create(&blog).Error; err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"message": err.Error(),
			"status":  http.StatusInternalServerError,
			"success": false,
		})

		return
	}

	ctx.JSON(http.StatusOK, gin.H{
		"message": "successfully added collection!!",
		"success": true,
		"status":  http.StatusOK,
	})
}
