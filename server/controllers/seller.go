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

func GetSellerData(ctx *gin.Context) {
	var body struct {
		SellerID string `json:"seller_id"`
	}

	if err := ctx.ShouldBindJSON(&body); err != nil {
		helpers.ErrJSONResponse(ctx, http.StatusBadRequest, err.Error())
		return
	}

	var foundSeller models.Seller
	if err := database.DB.Where("seller_id = ?", body.SellerID).First(&foundSeller).Error; err != nil {
		helpers.ErrJSONResponse(ctx, http.StatusNotFound, "user not found")
		return
	}

	helpers.JSONResponse(ctx, "", helpers.DataHelper(foundSeller))
}

func SellerUpdate(ctx *gin.Context) {
	var body models.Seller
	if err := ctx.ShouldBindJSON(&body); err != nil {
		helpers.ErrJSONResponse(ctx, http.StatusBadRequest, err.Error())
		return
	}
	if body.SellerID == "" {
		helpers.ErrJSONResponse(ctx, http.StatusBadRequest, "invalid ID")
		return
	}

	// if body.Email != "" {
	// 	if err := database.DB.Where("email = ?", body.Email).First(&models.Seller{}).Error; err == nil {
	// 		helpers.ErrJSONResponse(ctx, http.StatusBadRequest, "user with this email already exists!")
	// 		return
	// 	}
	// }

	// if body.Username != "" {
	// 	if err := database.DB.Where("username = ?", body.Username).First(&models.Seller{}).Error; err == nil {
	// 		helpers.ErrJSONResponse(ctx, http.StatusBadRequest, "user with this username already exists!")
	// 		return
	// 	}
	// }

	if err := database.DB.Model(&models.Seller{}).Where("seller_id = ?", body.SellerID).Updates(map[string]interface{}{
		"seller_name": body.SellerName,
		"username":    body.Username,
		"email":       body.Email,
		"phone":       body.Phone,
		"location":    body.Location,
	}).Error; err != nil {
		helpers.ErrJSONResponse(ctx, http.StatusInternalServerError, err.Error())
		return
	}

	helpers.JSONResponse(ctx, "successfully updated user!")
}

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
