package controllers

import (
	"net/http"
	"solitude/database"
	"solitude/helpers"
	"solitude/models"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

func GetAllCollections(ctx *gin.Context) {
	var products []models.Product

	if database.DB.
		Find(&products).
		Order("created_at DESC").
		Select("description, image, product_name, id, created_at").
		Error != nil {
		helpers.ErrJSONResponse(ctx, http.StatusInternalServerError, "There's a problem getting the collections data")
		return
	}

	var responseProducts []models.Collections
	for _, product := range products {
		responseProduct := models.Collections{
			ID:          product.ProductID,
			Title:       product.ProductName,
			Image:       product.Image[0],
			CreatedAt:   product.CreatedAt,
			Description: product.Description,
		}
		responseProducts = append(responseProducts, responseProduct)
	}

	helpers.JSONResponse(ctx, "", helpers.DataHelper(responseProducts))
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
		ID:          uuid.Must(uuid.NewRandom()).String(),
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
