package controllers

import (
	"net/http"
	"solitude/database"
	"solitude/helpers"
	"solitude/models"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

func GetVariationsByID(ctx *gin.Context) {
	var body struct {
		ProductID string `json:"product_id" validate:"required"`
	}

	if err := ctx.ShouldBindJSON(&body); err != nil {
		helpers.ErrJSONResponse(ctx, http.StatusBadRequest, "invalid payload")
		return
	}

	if err := Validate.Struct(body); err != nil {
		helpers.ErrJSONResponse(ctx, http.StatusBadRequest, err.Error())
		return
	}

	var existingCategories []models.ProductVariations
	if err := database.DB.Find(&existingCategories, "product_id = ?", body.ProductID).Error; err != nil {
		helpers.ErrJSONResponse(ctx, http.StatusInternalServerError, err.Error())
		return
	}

	helpers.JSONResponse(ctx, "", helpers.DataHelper(existingCategories))

}

func AddVariation(ctx *gin.Context) {
	var body struct {
		SellerID  string `json:"seller_id" validate:"required"`
		ProductID string `json:"product_id" validate:"required"`
		Variation []struct {
			Label string   `json:"label"`
			Value []string `json:"value"`
		} `json:"variations" validate:"required"`
	}

	if err := ctx.ShouldBindJSON(&body); err != nil {
		helpers.ErrJSONResponse(ctx, http.StatusBadRequest, err.Error())
		return
	}

	if err := Validate.Struct(body); err != nil {
		helpers.ErrJSONResponse(ctx, http.StatusBadRequest, err.Error())
		return
	}

	var currSeller models.Seller
	if err := database.DB.
		Preload("Products").
		Find(&currSeller, "seller_id = ?", body.SellerID).Error; err != nil {
		helpers.ErrJSONResponse(ctx, http.StatusInternalServerError, err.Error())
		return
	}
	var found bool
	for _, v := range *currSeller.Products {
		if body.ProductID == v.ProductID {
			found = true
			break
		}
	}

	if !found {
		helpers.ErrJSONResponse(ctx, http.StatusInternalServerError, "Invalid product_id passed!")
		return
	}

	var currProd models.Product
	if err := database.DB.
		Preload("Variations").
		Where("product_id = ?", body.ProductID).
		First(&currProd).
		Error; err != nil {
		helpers.ErrJSONResponse(ctx, http.StatusInternalServerError, err.Error())
		return
	}

	var newVar []models.ProductVariations
	for _, v := range body.Variation {
		newVar = append(newVar, models.ProductVariations{
			ID:        uuid.Must(uuid.NewRandom()).String(),
			Label:     v.Label,
			Value:     v.Value,
			ProductID: currProd.ProductID,
		})
	}

	if len(currProd.Variations) >= 3 {
		helpers.ErrJSONResponse(ctx, http.StatusBadRequest, "Maximum variations limit reached")
		return
	}

	if err := database.DB.
		Model(&currProd).
		Association("Variations").
		Append(newVar); err != nil {
		helpers.ErrJSONResponse(ctx, http.StatusInternalServerError, err.Error())
		return
	}

	helpers.JSONResponse(ctx, "")
}

func DeleteVariation(ctx *gin.Context) {
	var body struct {
		VarID string `json:"variation_id" validate:"required"`
	}

	if err := ctx.ShouldBindJSON(&body); err != nil {
		helpers.ErrJSONResponse(ctx, http.StatusBadRequest, err.Error())
		return
	}

	if err := Validate.Struct(body); err != nil {
		helpers.ErrJSONResponse(ctx, http.StatusBadRequest, err.Error())
		return
	}

	var variation models.ProductVariations
	if err := database.DB.Delete(&variation, "id = ?", body.VarID).Error; err != nil {
		helpers.ErrJSONResponse(ctx, http.StatusInternalServerError, err.Error())
		return
	}

	helpers.JSONResponse(ctx, "deleted successfully")
}

func UpdateVariation(ctx *gin.Context) {
	var body struct {
		VarID     string `json:"variation_id" validate:"required"`
		Variation struct {
			Label string   `json:"label"`
			Value []string `json:"value"`
		} `json:"variations" validate:"required"`
	}

	if err := ctx.ShouldBindJSON(&body); err != nil {
		helpers.ErrJSONResponse(ctx, http.StatusBadRequest, err.Error())
		return
	}

	if err := Validate.Struct(body); err != nil {
		helpers.ErrJSONResponse(ctx, http.StatusBadRequest, err.Error())
		return
	}

	if err := database.DB.Where("id = ?", body.VarID).Updates(models.ProductVariations{
		Label: body.Variation.Label,
		Value: body.Variation.Value,
	}).Error; err != nil {
		helpers.ErrJSONResponse(ctx, http.StatusInternalServerError, err.Error())
		return
	}

	helpers.JSONResponse(ctx, "updated successfully")
}
