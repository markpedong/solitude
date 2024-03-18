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
		models.ProductReviews
		OrderID string `json:"order_id"`
	}
	if err := helpers.BindValidateJSON(ctx, &body); err != nil {
		return
	}

	rating := &models.ProductReviews{
		ID:          helpers.NewUUID(),
		Title:       body.Title,
		Description: body.Description,
		Rate:        body.Rate,
		ProductID:   body.ProductID,
		UserID:      body.UserID,
	}
	if err := database.DB.Create(&rating).Error; err != nil {
		helpers.ErrJSONResponse(ctx, http.StatusInternalServerError, err.Error())
		return
	}
	helpers.JSONResponse(ctx, "successfully added review")
}
func UpdateProductRating(ctx *gin.Context) {}
func DeleteProductRating(ctx *gin.Context) {}
