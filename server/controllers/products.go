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

	product := &models.Product{
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
		Gender   string `json:"gender"`
	}

	if err := ctx.ShouldBindJSON(&body); err != nil {
		helpers.ErrJsonResponse(ctx, http.StatusBadRequest, err.Error())
		return
	}

	var query = database.DB.Order("created_at DESC")
	if body.Material != "" {
		query = query.Where("material = ?", body.Material)
	}
	if body.Price > 0 {
		query = query.Where("price <= ?", body.Price)
	}
	if body.Gender != "" {
		validGenders := map[string]bool{"male": true, "female": true, "others": true}

		if _, found := validGenders[body.Gender]; found {
			query = query.Where("gender = ?", body.Gender)
		} else {
			ctx.JSON(http.StatusBadRequest, gin.H{
				"message": "Invalid Gender! Please check",
				"success": false,
				"status":  http.StatusBadRequest,
			})
			return
		}
	}

	var products []models.Product
	if err := query.
		Find(&products).
		Error; err != nil {
		helpers.ErrJsonResponse(ctx, http.StatusInternalServerError, err.Error())
		return
	}

	ctx.JSON(http.StatusOK, gin.H{
		"message": "success",
		"data":    products,
		"success": true,
		"status":  http.StatusOK,
	})
}

func GetProductsByID(ctx *gin.Context) {
	id := ctx.Param("id")

	var product models.Product
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
