package controllers

import (
	"net/http"
	"solitude/database"
	"solitude/helpers"
	"solitude/models"
	"solitude/tokens"

	"github.com/gin-gonic/gin"
)

func SellerSignup(ctx *gin.Context) {
	var body struct {
		SellerID   string `json:"seller_id" gorm:"primaryKey"`
		SellerName string `json:"seller_name" validate:"max=10"`
		Password   string `json:"password" validate:"required,min=6"`
		Email      string `json:"email" validate:"required"`
		Username   string `json:"username"`
	}

	if err := ctx.ShouldBindJSON(&body); err != nil {
		helpers.ErrJSONResponse(ctx, http.StatusBadRequest, "invalid JSON input")
		return
	}

	if err := Validate.Struct(body); err != nil {
		helpers.ErrJSONResponse(ctx, http.StatusBadRequest, err.Error())
		return
	}

	var existingUser models.Seller
	if body.Email != "" {
		if err := database.DB.Where("email = ?", body.Email).First(&existingUser).Error; err == nil {
			helpers.ErrJSONResponse(ctx, http.StatusBadRequest, "user with this email already exists!")
			return
		}
	}

	if body.Username != "" {
		if err := database.DB.Where("username = ?", body.Username).First(&existingUser).Error; err == nil {
			helpers.ErrJSONResponse(ctx, http.StatusBadRequest, "user with this username already exists!")
			return
		}
	}

	body.SellerID = Guid.String()
	token, refreshToken, err := tokens.TokenGenerator(body.Email, body.SellerName, "", body.SellerID)
	if err != nil {
		helpers.ErrJSONResponse(ctx, http.StatusBadRequest, err.Error())
		return
	}

	newSeller := models.Seller{
		SellerID: body.SellerID,
		Password: body.Password,
		Email:    body.Email,
		Username: body.Username,
	}

	if err := database.DB.Create(&newSeller).Error; err != nil {
		helpers.ErrJSONResponse(ctx, http.StatusInternalServerError, "Failed to create user")
		return
	}

	newSeller.Password = HashPassword(body.Password)
	ctx.JSON(http.StatusOK, gin.H{
		"message":       "Seller has been created!",
		"success":       true,
		"status":        http.StatusOK,
		"data":          newSeller,
		"token":         token,
		"refresh_token": refreshToken,
	})
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

	if body.Email == "" || body.Password == "" {
		helpers.ErrJSONResponse(ctx, http.StatusBadRequest, "email and password are required")
		return
	}

	var existingSeller models.Seller
	if err := database.DB.Where("email = ?", body.Email).First(&existingSeller).Error; err != nil {
		helpers.ErrJSONResponse(ctx, http.StatusBadRequest, "user not found!")
		return
	}

	validPass, msg := VerifyPassword(existingSeller.Password, body.Password)
	if !validPass {
		helpers.ErrJSONResponse(ctx, http.StatusUnauthorized, msg)
		return
	}

	token, refreshToken, err := tokens.TokenGenerator(existingSeller.Email, existingSeller.SellerName, "", existingSeller.SellerID)
	if err != nil {
		helpers.ErrJSONResponse(ctx, http.StatusInternalServerError, "Error generating tokens")
		return
	}

	existingSeller.Password = HashPassword(body.Password)
	res := map[string]interface{}{
		"data":          existingSeller,
		"token":         token,
		"refresh_token": refreshToken,
	}
	helpers.JSONResponse(ctx, "Logged in successfully", res)
}
