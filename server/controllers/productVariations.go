package controllers

import (
	"net/http"
	"solitude/database"
	"solitude/helpers"
	"solitude/models"

	"github.com/gin-gonic/gin"
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

	var existingProduct models.Product
	if err := database.DB.Preload("Variations.Value").Find(&existingProduct, "product_id = ?", body.ProductID).Error; err != nil {
		helpers.ErrJSONResponse(ctx, http.StatusInternalServerError, err.Error())
		return
	}

	helpers.JSONResponse(ctx, "", helpers.DataHelper(existingProduct.Variations))
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
	tx := database.DB.Begin()
	for _, v := range body.Variation {
		newVarInstance := models.ProductVariations{
			ID:        helpers.NewUUID(),
			Label:     v.Label,
			ProductID: currProd.ProductID,
		}

		if err := tx.Create(&newVarInstance).Error; err != nil {
			tx.Rollback()
			helpers.ErrJSONResponse(ctx, http.StatusInternalServerError, err.Error())
			return
		}

		for _, val := range v.Value {
			varValue := models.VariationValue{
				VariationID: newVarInstance.ID,
				ID:          helpers.NewUUID(),
				Value:       val,
			}

			if err := tx.Create(&varValue).Error; err != nil {
				tx.Rollback()
				helpers.ErrJSONResponse(ctx, http.StatusInternalServerError, err.Error())
				return
			}
		}

		newVar = append(newVar, newVarInstance)
	}

	if len(currProd.Variations)+len(newVar) > 3 {
		tx.Rollback()
		helpers.ErrJSONResponse(ctx, http.StatusBadRequest, "Maximum variations limit reached")
		return
	}

	if err := tx.Commit().Error; err != nil {
		tx.Rollback()
		helpers.ErrJSONResponse(ctx, http.StatusInternalServerError, err.Error())
		return
	}

	if err := database.DB.Model(&currProd).Association("Variations").Append(newVar); err != nil {
		helpers.ErrJSONResponse(ctx, http.StatusInternalServerError, err.Error())
		return
	}

	helpers.JSONResponse(ctx, "")
}

func DeleteVariation(ctx *gin.Context) {
	var body struct {
		VarID string `json:"variation_id" validate:"required"`
	}
	if err := helpers.BindValidateJSON(ctx, &body); err != nil {
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
	if err := helpers.BindValidateJSON(ctx, &body); err != nil {
		return
	}

	var currVariations models.ProductVariations
	if err := database.DB.First(&currVariations, "id = ?", body.VarID).Error; err != nil {
		helpers.ErrJSONResponse(ctx, http.StatusInternalServerError, err.Error())
		return
	}

	if err := database.DB.Model(&currVariations).Updates(models.ProductVariations{
		Label: body.Variation.Label,
	}).Error; err != nil {
		helpers.ErrJSONResponse(ctx, http.StatusInternalServerError, err.Error())
		return
	}

	// helpers.JSONResponse(ctx, "updated successfully")
	helpers.JSONResponse(ctx, "", helpers.DataHelper(currVariations))
}
