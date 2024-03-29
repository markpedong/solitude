package controllers

import (
	"fmt"
	"net/http"
	"solitude/database"
	"solitude/helpers"
	"solitude/models"

	"github.com/gin-gonic/gin"
)

func GetSellerReviews(ctx *gin.Context) {
	var body struct {
		SellerID string `json:"seller_id"`
	}
	if err := helpers.BindValidateJSON(ctx, &body); err != nil {
		return
	}

	var sellerReviews []models.SellerReviews
	if err := database.DB.Find(&sellerReviews, "seller_id = ?", body.SellerID).Error; err != nil {
		helpers.ErrJSONResponse(ctx, http.StatusInternalServerError, err.Error())
		return
	}

	helpers.JSONResponse(ctx, "", helpers.DataHelper(sellerReviews))
}

func GetRatings(ctx *gin.Context) {
	var body struct {
		ProductID string `json:"product_id"`
		UserID    string `json:"user_id"`
		SellerID  string `json:"seller_id"`
	}
	if err := helpers.BindValidateJSON(ctx, &body); err != nil {
		return
	}

	query := database.DB
	if body.ProductID != "" {
		query = query.Where("product_id = ?", body.ProductID)
	}
	if body.UserID != "" {
		query = query.Where("user_id = ?", body.UserID)
	}
	if body.UserID == "" && body.ProductID == "" && body.SellerID == "" {
		query = query.Order("created_at desc").Limit(10)
	}

	var reviews []models.ProductReviews
	if err := query.Find(&reviews).Error; err != nil {
		helpers.ErrJSONResponse(ctx, http.StatusInternalServerError, err.Error())
		return
	}
	var transformed []models.ProductReviewResponse
	for _, v := range reviews {
		var user models.User
		if err := database.DB.First(&user, "id = ?", v.UserID).Error; err != nil {
			helpers.ErrJSONResponse(ctx, http.StatusInternalServerError, err.Error())
			return
		}
		var product models.Product
		if err := database.DB.First(&product, "product_id = ?", v.ProductID).Error; err != nil {
			helpers.ErrJSONResponse(ctx, http.StatusInternalServerError, err.Error())
			return
		}

		transformed = append(transformed, models.ProductReviewResponse{
			ProductReviews: v,
			Name:           fmt.Sprintf("%v %v", user.FirstName, user.LastName),
			ProductName:    product.ProductName,
		})
	}

	helpers.JSONResponse(ctx, "", helpers.DataHelper(transformed))
}

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
	if err := database.DB.Preload("Orders").First(&currOrderGroup, "id = ?", body.GroupID).Error; err != nil {
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
			Images:      v.Images,
		}
		if err := database.DB.Create(&rating).Error; err != nil {
			helpers.ErrJSONResponse(ctx, http.StatusInternalServerError, err.Error())
			return
		}
	}

	for _, v := range currOrderGroup.Orders {
		var seller models.Seller
		if err := database.DB.First(&seller, "seller_id = ?", v.SellerID).Error; err != nil {
			helpers.ErrJSONResponse(ctx, http.StatusInternalServerError, err.Error())
			return
		}

		database.DB.Save(&seller)
	}

	currOrderGroup.Reviewed = 1
	database.DB.Save(&currOrderGroup)

	helpers.JSONResponse(ctx, "successfully added review")
}

func UpdateProductRating(ctx *gin.Context) {}

func DeleteProductRating(ctx *gin.Context) {}
