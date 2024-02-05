package controllers

import (
	"net/http"
	"solitude/database"
	"solitude/helpers"
	"solitude/models"
	"solitude/tokens"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

func SellerSignup(ctx *gin.Context) {
	var body models.Seller

	if err := ctx.ShouldBindJSON(&body); err != nil {
		helpers.ErrJSONResponse(ctx, http.StatusBadRequest, "invalid JSON input")
		return
	}

	if err := Validate.Struct(&body); err != nil {
		helpers.ErrJSONResponse(ctx, http.StatusBadRequest, err.Error())
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
		SellerID:   uuid.Must(uuid.NewRandom()).String(),
		SellerName: body.SellerName,
		Password:   body.Password,
		Email:      body.Email,
		Phone:      body.Phone,
		Username:   body.Username,
		Location:   body.Location,
		Brands:     &[]models.Brands{},
		Products:   &[]models.Product{},
	}

	if err := database.DB.Model(&models.Seller{}).Create(&newSeller).Error; err != nil {
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

	if err := ctx.ShouldBindJSON(&body); err != nil {
		helpers.ErrJSONResponse(ctx, http.StatusBadRequest, "invalid JSON input")
		return
	}

	if err := Validate.Struct(&body); err != nil {
		helpers.ErrJSONResponse(ctx, http.StatusBadRequest, err.Error())
		return
	}

	var existingSeller models.Seller
	if err := database.DB.First(&existingSeller, "email = ?", body.Email).Error; err != nil {
		helpers.ErrJSONResponse(ctx, http.StatusBadRequest, "user doesn't exist")
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
