package controllers

import (
	"net/http"
	"solitude/database"
	"solitude/helpers"
	"solitude/models"

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
