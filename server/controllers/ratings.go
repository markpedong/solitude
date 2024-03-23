package controllers

import (
	"net/http"
	"solitude/database"
	"solitude/helpers"
	"solitude/models"

	"github.com/gin-gonic/gin"
)

func GetProductRating(ctx *gin.Context) {}

func AddProductRating(ctx *gin.Context) {
	var body struct {
		RatingArr []models.ReviewItem `json:"ratings"`
		UserID    string              `json:"user_id"`
		GroupID   string              `json:"group_id"`
	}
	if err := helpers.BindValidateJSON(ctx, &body); err != nil {
		return
	}

	var currOrderGroup models.OrderGroup
	if err := database.DB.Preload("Orders").Where("id = ?", body.GroupID).Find(&currOrderGroup).Error; err != nil {
		helpers.ErrJSONResponse(ctx, http.StatusInternalServerError, err.Error())
		return
	}

	for _, v := range body.RatingArr {
		rating := &models.ProductReviews{
			ID:          helpers.NewUUID(),
			Title:       v.Title,
			Description: v.Description,
			Rate:        float64(v.Rating),
			ProductID:   v.ProductID,
			UserID:      body.UserID,
		}
		if err := database.DB.Create(&rating).Error; err != nil {
			helpers.ErrJSONResponse(ctx, http.StatusInternalServerError, err.Error())
			return
		}
	}

	currOrderGroup.Reviewed = 1
	database.DB.Save(&currOrderGroup)

	helpers.JSONResponse(ctx, "successfully added review", helpers.DataHelper(body))
}

func UpdateProductRating(ctx *gin.Context) {}

func DeleteProductRating(ctx *gin.Context) {}
