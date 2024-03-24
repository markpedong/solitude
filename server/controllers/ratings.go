package controllers

import (
	"net/http"
	"solitude/database"
	"solitude/helpers"
	"solitude/models"

	"github.com/gin-gonic/gin"
)

func GetProductRating(ctx *gin.Context) {}

func AddSellerRating(ctx *gin.Context) {
	var body struct {
		RatingArr []models.SellerReviews `json:"reviews"`
		UserID    string                 `json:"user_id" validate:"required"`
		GroupID   string                 `json:"group_id" validate:"required"`
	}
	if err := helpers.BindValidateJSON(ctx, &body); err != nil {
		return
	}

	var currOrderGroup models.OrderGroup
	if err := database.DB.Preload("Orders").First(&currOrderGroup, "id = ?", body.GroupID).Error; err != nil {
		helpers.ErrJSONResponse(ctx, http.StatusInternalServerError, err.Error())
		return
	}

	for _, v := range body.RatingArr {
		rating := &models.SellerReviews{
			ID:          helpers.NewUUID(),
			Description: v.Description,
			Rate:        v.Rate,
			UserID:      body.UserID,
			SellerID:    v.SellerID,
		}
		if err := database.DB.Create(&rating).Error; err != nil {
			helpers.ErrJSONResponse(ctx, http.StatusInternalServerError, err.Error())
			return
		}
	}

	currOrderGroup.ReviewedSeller = 1
	database.DB.Save(&currOrderGroup)

	helpers.JSONResponse(ctx, "successfully added review")
}

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
			Description: v.Description,
			Rate:        v.Rating,
			ProductID:   v.ProductID,
			UserID:      body.UserID,
			Image:       v.Image,
		}
		if err := database.DB.Create(&rating).Error; err != nil {
			helpers.ErrJSONResponse(ctx, http.StatusInternalServerError, err.Error())
			return
		}
	}

	for _, v := range currOrderGroup.Orders {
		var seller models.Seller
		if err := database.DB.First(&seller, "id = ?", v.SellerID).Error; err != nil {
			helpers.ErrJSONResponse(ctx, http.StatusInternalServerError, err.Error())
			return
		}

		seller.Rating = seller.Rating + 1
		database.DB.Save(&seller)
	}

	currOrderGroup.Reviewed = 1
	database.DB.Save(&currOrderGroup)

	helpers.JSONResponse(ctx, "successfully added review")
}

func UpdateProductRating(ctx *gin.Context) {}

func DeleteProductRating(ctx *gin.Context) {}
