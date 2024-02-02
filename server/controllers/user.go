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

	helpers.JSONResponse(ctx, "user found!", helpers.DataHelper(foundUser))
}

func UpdateUser(ctx *gin.Context) {
	var body struct {
		ID        string `json:"id"`
		FirstName string `json:"first_name"`
		LastName  string `json:"last_name"`
		Username  string `json:"username"`
		Gender    string `json:"gender"`
		Birthday  string `json:"birthday"`
		Email     string `json:"email"`
	}
	if err := ctx.ShouldBindJSON(&body); err != nil {
		helpers.ErrJSONResponse(ctx, http.StatusBadRequest, err.Error())
		return
	}
	if body.ID == "" {
		helpers.ErrJSONResponse(ctx, http.StatusBadRequest, "invalid ID")
		return
	}

	// if body.Email != "" {
	// 	if err := database.DB.Where("email = ?", body.Email).First(&models.User{}).Error; err == nil {
	// 		helpers.ErrJSONResponse(ctx, http.StatusBadRequest, "user with this email already exists!")
	// 		return
	// 	}
	// }

	// if body.Username != "" {
	// 	if err := database.DB.Where("username = ?", body.Username).First(&models.User{}).Error; err == nil {
	// 		helpers.ErrJSONResponse(ctx, http.StatusBadRequest, "user with this username already exists!")
	// 		return
	// 	}
	// }

	if err := database.DB.Model(&models.User{}).Where("id = ?", body.ID).Updates(map[string]interface{}{
		"first_name": body.FirstName,
		"last_name":  body.LastName,
		"username":   body.Username,
		"gender":     body.Gender,
		"birthday":   body.Birthday,
		"email":      body.Email,
	}).Error; err != nil {
		helpers.ErrJSONResponse(ctx, http.StatusInternalServerError, err.Error())
		return
	}

	helpers.JSONResponse(ctx, "successfully updated user!")
}

func Signup(ctx *gin.Context) {
	var body struct {
		ID             string           `json:"id" gorm:"primaryKey"`
		FirstName      string           `json:"first_name" validate:"required,max=10"`
		LastName       string           `json:"last_name" validate:"required,max=10"`
		Password       string           `json:"password" validate:"required,min=6"`
		Email          string           `json:"email" validate:"required"`
		Phone          string           `json:"phone"`
		Username       string           `json:"username"`
		UserCart       []models.Product `json:"user_cart"`
		AddressDetails []models.Address `json:"address_details"`
		Orders         []models.Order   `json:"orders"`
	}

	if err := ctx.ShouldBindJSON(&body); err != nil {
		helpers.ErrJSONResponse(ctx, http.StatusBadRequest, "invalid JSON input")
		return
	}

	if err := Validate.Struct(body); err != nil {
		helpers.ErrJSONResponse(ctx, http.StatusBadRequest, err.Error())
		return
	}

	var existingUser models.User
	if body.Phone != "" {
		if err := database.DB.Where("phone = ?", body.Phone).First(&existingUser).Error; err == nil {
			helpers.ErrJSONResponse(ctx, http.StatusBadRequest, "user with this phone number already exists!")
			return
		}
	}

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

	body.ID = Guid.String()
	token, refreshToken, err := tokens.TokenGenerator(body.Email, body.FirstName, body.LastName, body.ID)
	if err != nil {
		helpers.ErrJSONResponse(ctx, http.StatusBadRequest, err.Error())
		return
	}

	newUser := models.User{
		ID:             body.ID,
		FirstName:      body.FirstName,
		LastName:       body.LastName,
		Password:       body.Password,
		Email:          body.Email,
		Phone:          body.Phone,
		Username:       body.Username,
		UserCart:       &[]models.Product{},
		AddressDetails: &[]models.Address{},
		Orders:         &[]models.Order{},
	}

	if err := database.DB.Create(&newUser).Error; err != nil {
		helpers.ErrJSONResponse(ctx, http.StatusInternalServerError, "Failed to create user")
		return
	}

	newUser.Password = HashPassword(body.Password)
	ctx.JSON(http.StatusOK, gin.H{
		"message":       "User has been created!",
		"success":       true,
		"status":        http.StatusOK,
		"data":          newUser,
		"token":         token,
		"refresh_token": refreshToken,
	})
}

func Login(ctx *gin.Context) {
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

	var existingUser models.User
	if err := database.DB.Where("email = ?", body.Email).First(&existingUser).Error; err != nil {
		helpers.ErrJSONResponse(ctx, http.StatusBadRequest, "user not found!")
		return
	}

	validPass, msg := VerifyPassword(existingUser.Password, body.Password)
	if !validPass {
		helpers.ErrJSONResponse(ctx, http.StatusUnauthorized, msg)
		return
	}

	token, refreshToken, err := tokens.TokenGenerator(existingUser.Email, existingUser.FirstName, existingUser.LastName, existingUser.ID)
	if err != nil {
		helpers.ErrJSONResponse(ctx, http.StatusInternalServerError, "Error generating tokens")
		return
	}

	existingUser.Password = HashPassword(body.Password)
	res := map[string]interface{}{
		"data":          existingUser,
		"token":         token,
		"refresh_token": refreshToken,
	}
	helpers.JSONResponse(ctx, "Logged in successfully", res)
}
