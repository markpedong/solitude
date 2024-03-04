package controllers

import (
	"net/http"
	"solitude/database"
	"solitude/helpers"
	"solitude/models"
	"solitude/tokens"

	"github.com/gin-gonic/gin"
)

func GetUserData(ctx *gin.Context) {
	var body struct {
		ID string `json:"id"`
	}

	if err := ctx.ShouldBindJSON(&body); err != nil {
		helpers.ErrJSONResponse(ctx, http.StatusBadRequest, err.Error())
		return
	}

	var foundUser models.User
	if err := database.DB.Where("id = ?", body.ID).First(&foundUser).Error; err != nil {
		helpers.ErrJSONResponse(ctx, http.StatusNotFound, "user not found")
		return
	}

	helpers.JSONResponse(ctx, "", helpers.DataHelper(foundUser))
}

func UserUpdate(ctx *gin.Context) {
	var body struct {
		Avatar    string `json:"avatar"`
		ID        string `json:"id"`
		FirstName string `json:"first_name"`
		LastName  string `json:"last_name"`
		Username  string `json:"username"`
		Gender    string `json:"gender"`
		Birthday  string `json:"birthday"`
		Email     string `json:"email"`
		Phone     string `json:"phone"`
	}
	if err := helpers.BindValidateJSON(ctx, &body); err != nil {
		return
	}

	if body.ID == "" {
		helpers.ErrJSONResponse(ctx, http.StatusBadRequest, "invalid ID")
		return
	}
	var existingUser models.User
	if err := database.DB.Model(&existingUser).Where("id = ?", body.ID).First(&existingUser).Error; err != nil {
		helpers.ErrJSONResponse(ctx, http.StatusInternalServerError, err.Error())
		return
	}

	if body.Email != existingUser.Email && body.Email != "" && helpers.ExistingFields("email", body.Email) {
		helpers.ErrJSONResponse(ctx, http.StatusBadRequest, emailExist)
		return
	}
	if body.Phone != existingUser.Phone && body.Phone != "" && helpers.ExistingFields("phone", body.Phone) {
		helpers.ErrJSONResponse(ctx, http.StatusBadRequest, phoneExist)
		return
	}
	if body.Username != existingUser.Username && body.Username != "" && helpers.ExistingFields("username", body.Username) {
		helpers.ErrJSONResponse(ctx, http.StatusBadRequest, usernameExist)
		return
	}

	if err := database.DB.Model(&models.User{}).Where("id = ?", body.ID).Updates(map[string]interface{}{
		"first_name": body.FirstName,
		"last_name":  body.LastName,
		"username":   body.Username,
		"gender":     body.Gender,
		"birthday":   body.Birthday,
		"email":      body.Email,
		"avatar":     body.Avatar,
	}).Error; err != nil {
		helpers.ErrJSONResponse(ctx, http.StatusInternalServerError, err.Error())
		return
	}

	helpers.JSONResponse(ctx, "successfully updated user!")
}

func UserSignup(ctx *gin.Context) {
	var body models.User
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
	token, refreshToken, err := tokens.TokenGenerator(body.Email, body.FirstName, body.LastName, body.ID)
	if err != nil {
		helpers.ErrJSONResponse(ctx, http.StatusBadRequest, err.Error())
		return
	}

	newUser := models.User{
		ID:             helpers.NewUUID(),
		FirstName:      body.FirstName,
		LastName:       body.LastName,
		Password:       body.Password,
		Email:          body.Email,
		Phone:          body.Phone,
		Username:       body.Username,
		Cart:           []*models.Product{},
		AddressDetails: &[]models.Address{},
		Orders:         &[]models.Order{},
		Gender:         body.Gender,
		Birthday:       body.Birthday,
	}

	if err := database.DB.Create(&newUser).Error; err != nil {
		helpers.ErrJSONResponse(ctx, http.StatusInternalServerError, "Failed to create user")
		return
	}

	newUser.Password = HashPassword(body.Password)
	userRes := map[string]interface{}{
		"data":          newUser,
		"token":         token,
		"refresh_token": refreshToken,
	}

	helpers.JSONResponse(ctx, "user successfully created!", userRes)
}

func UserLogin(ctx *gin.Context) {
	var body struct {
		Email    string `json:"email" validate:"required"`
		Password string `json:"password" validate:"required,min=6"`
	}
	if err := helpers.BindValidateJSON(ctx, &body); err != nil {
		return
	}

	var existingUser models.User
	if err := database.DB.First(&existingUser, "email = ?", body.Email).Error; err != nil {
		helpers.ErrJSONResponse(ctx, http.StatusBadRequest, err.Error())
		return
	}

	notValid, msg := VerifyPassword(existingUser.Password, body.Password)
	if notValid {
		helpers.ErrJSONResponse(ctx, http.StatusBadRequest, msg)
		return
	}

	token, refreshToken, err := tokens.TokenGenerator(existingUser.Email, existingUser.FirstName, existingUser.LastName, existingUser.ID)
	if err != nil {
		helpers.ErrJSONResponse(ctx, http.StatusBadRequest, err.Error())
		return
	}

	ctx.Header("token", token)
	userRes := map[string]interface{}{
		"data":          existingUser,
		"token":         token,
		"refresh_token": refreshToken,
	}

	helpers.JSONResponse(ctx, "", userRes)
}
