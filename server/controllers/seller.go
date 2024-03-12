package controllers

import (
	"net/http"
	"solitude/database"
	"solitude/helpers"
	"solitude/models"
	"solitude/tokens"

	"github.com/gin-gonic/gin"
)

func GetSellerData(ctx *gin.Context) {
	var body struct {
		SellerID string `json:"seller_id"`
	}
	if err := helpers.BindValidateJSON(ctx, &body); err != nil {
		return
	}

	var foundSeller models.JSONSeller
	var productCount int64

	if err := database.DB.Unscoped().Table("seller").Where("seller_id = ?", body.SellerID).First(&foundSeller).Error; err != nil {
		helpers.ErrJSONResponse(ctx, http.StatusNotFound, "seller not found")
		return
	}
	if err := database.DB.Unscoped().Model(&models.Product{}).Where("seller_id = ?", foundSeller.SellerID).Count(&productCount).Error; err != nil {
		helpers.ErrJSONResponse(ctx, http.StatusBadRequest, err.Error())
		return
	}

	foundSeller.Products = productCount
	helpers.JSONResponse(ctx, "", helpers.DataHelper(foundSeller))
}

func SellerUpdate(ctx *gin.Context) {
	var body models.Seller
	if err := helpers.BindValidateJSON(ctx, &body); err != nil {
		return
	}

	if body.SellerID == "" {
		helpers.ErrJSONResponse(ctx, http.StatusBadRequest, "invalid ID")
		return
	}

	var existingSeller models.Seller
	if err := database.DB.Unscoped().Model(&existingSeller).Where("seller_id = ?", body.SellerID).First(&existingSeller).Error; err != nil {
		helpers.ErrJSONResponse(ctx, http.StatusInternalServerError, err.Error())
		return
	}

	if body.Email != existingSeller.Email && body.Email != "" && helpers.ExistingFields("email", body.Email) {
		helpers.ErrJSONResponse(ctx, http.StatusBadRequest, emailExist)
		return
	}
	if body.Phone != existingSeller.Phone && body.Phone != "" && helpers.ExistingFields("phone", body.Phone) {
		helpers.ErrJSONResponse(ctx, http.StatusBadRequest, phoneExist)
		return
	}
	if body.Username != existingSeller.Username && body.Username != "" && helpers.ExistingFields("username", body.Username) {
		helpers.ErrJSONResponse(ctx, http.StatusBadRequest, usernameExist)
		return
	}

	if err := database.DB.Unscoped().Model(&existingSeller).Where("seller_id = ?", body.SellerID).Updates(map[string]interface{}{
		"seller_name": body.SellerName,
		"username":    body.Username,
		"email":       body.Email,
		"phone":       body.Phone,
		"location":    body.Location,
		"avatar":      body.Avatar,
	}).Error; err != nil {
		helpers.ErrJSONResponse(ctx, http.StatusInternalServerError, err.Error())
		return
	}

	helpers.JSONResponse(ctx, "successfully updated user!")
}

func SellerSignup(ctx *gin.Context) {
	var body models.Seller
	if err := helpers.BindValidateJSON(ctx, &body); err != nil {
		return
	}

	if body.Email != "" && helpers.ExistingFields("email", body.Email) {
		helpers.ErrJSONResponse(ctx, http.StatusBadRequest, emailExist)
		return
	}
	if body.Phone != "" && helpers.ExistingFields("phone", body.Phone) {
		helpers.ErrJSONResponse(ctx, http.StatusBadRequest, phoneExist)
		return
	}
	if body.Username != "" && helpers.ExistingFields("username", body.Username) {
		helpers.ErrJSONResponse(ctx, http.StatusBadRequest, usernameExist)
		return
	}

	token, refreshToken, err := tokens.TokenGenerator(body.Email, body.SellerName, "", body.SellerID)
	if err != nil {
		helpers.ErrJSONResponse(ctx, http.StatusBadRequest, err.Error())
		return
	}

	newSeller := models.Seller{
		SellerID:   helpers.NewUUID(),
		SellerName: body.SellerName,
		Password:   body.Password,
		Email:      body.Email,
		Phone:      body.Phone,
		Username:   body.Username,
		Location:   body.Location,
		Products:   &[]models.Product{},
		Avatar:     body.Avatar,
	}

	if err := database.DB.Unscoped().Model(&models.Seller{}).Create(&newSeller).Error; err != nil {
		helpers.ErrJSONResponse(ctx, http.StatusInternalServerError, err.Error())
		return
	}

	newSeller.Password = HashPassword(body.Password)
	sellerRes := map[string]interface{}{
		"data":          newSeller,
		"token":         token,
		"refresh_token": refreshToken,
	}
	helpers.JSONResponse(ctx, "seller successfully created!", sellerRes)
}

func SellerLogin(ctx *gin.Context) {
	var body struct {
		Email    string `json:"email" validate:"required"`
		Password string `json:"password" validate:"required,min=6"`
	}
	if err := helpers.BindValidateJSON(ctx, &body); err != nil {
		return
	}

	var existingSeller models.Seller
	if err := database.DB.Unscoped().First(&existingSeller, "email = ?", body.Email).Error; err != nil {
		helpers.ErrJSONResponse(ctx, http.StatusBadRequest, err.Error())
		return
	}

	notValid, msg := VerifyPassword(existingSeller.Password, body.Password)
	if notValid {
		helpers.ErrJSONResponse(ctx, http.StatusBadRequest, msg)
		return
	}

	token, refreshToken, err := tokens.TokenGenerator(existingSeller.Email, existingSeller.SellerName, "", existingSeller.SellerID)
	if err != nil {
		helpers.ErrJSONResponse(ctx, http.StatusBadRequest, err.Error())
		return
	}

	userRes := map[string]interface{}{
		"data":          existingSeller,
		"token":         token,
		"refresh_token": refreshToken,
	}

	ctx.Header("token", token)
	helpers.JSONResponse(ctx, "", userRes)
}

func GetAllProductsBySellerID(ctx *gin.Context) {
	var body struct {
		SellerID string `json:"seller_id"`
	}
	if err := helpers.BindValidateJSON(ctx, &body); err != nil {
		return
	}

	var existingSeller models.Seller
	if err := database.DB.Unscoped().Preload("Products").Where("seller_id = ?", body.SellerID).First(&existingSeller).Error; err != nil {
		helpers.ErrJSONResponse(ctx, http.StatusBadRequest, err.Error())
		return
	}

	helpers.JSONResponse(ctx, "", helpers.DataHelper(existingSeller.Products))
}
