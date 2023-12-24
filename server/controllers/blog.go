package controllers

import (
	"net/http"
	"solitude/database"
	"solitude/models"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

func AddBlog(ctx *gin.Context) {
	var body struct {
		Title       string `json:"title" validate:"required"`
		Description string `json:"description" validate:"required"`
		Image       string `json:"image" validate:"required"`
		BlogLink    string `json:"blog_link" validate:"required"`
	}

	if err := ctx.ShouldBindJSON(&body); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"message": err.Error(),
			"success": false,
			"status":  http.StatusBadRequest,
		})

		return
	}

	blog := &models.LandingBlog{
		ID:          uuid.New(),
		Title:       body.Title,
		Description: body.Description,
		Image:       body.Image,
		BlogLink:    body.BlogLink,
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
		"message": "successfully added blog!",
		"success": true,
		"status":  http.StatusOK,
		"data":    blog,
	})
}

func GetAllBlog(ctx *gin.Context) {
	var blogList []models.LandingBlog

	if database.DB.Order("created_at DESC").Find(&blogList).Error != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"message": "There's a problem getting the blog data",
			"success": false,
		})

		return
	}

	ctx.JSON(http.StatusOK, gin.H{
		"message": "success",
		"data":    blogList,
		"success": true,
		"status":  http.StatusOK,
	})
}
