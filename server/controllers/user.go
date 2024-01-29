package controllers

import (
	"net/http"
	"solitude/database"
	"solitude/helpers"
	"solitude/models"

	"github.com/gin-gonic/gin"
)

func UpdateUser(ctx *gin.Context) {
	var body struct {
		ID        string `json:"id"`
		FirstName string `json:"first_name"`
		LastName  string `json:"last_name"`
		Username  string `json:"username"`
		Gender    int    `json:"gender"`
		Birthday  string `json:"birthday"`
	}
	if err := ctx.ShouldBindJSON(&body); err != nil {
		helpers.ErrJSONResponse(ctx, http.StatusBadRequest, err.Error())
		return
	}
	if body.ID == "" {
		helpers.ErrJSONResponse(ctx, http.StatusBadRequest, "invalid ID")
		return
	}

	var foundUser models.User
	if err := database.DB.Where("id = ?", body.ID).First(&foundUser).Error; err != nil {
		helpers.ErrJSONResponse(ctx, http.StatusNotFound, "user not found")
		return
	}

	if err := database.DB.Model(&foundUser).Updates(map[string]interface{}{
		"first_name": body.FirstName,
		"last_name":  body.LastName,
		"username":   body.Username,
		"gender":     body.Gender,
		"birthday":   body.Birthday,
	}).Error; err != nil {
		helpers.ErrJSONResponse(ctx, http.StatusInternalServerError, err.Error())
		return
	}

	helpers.JSONResponse(ctx, "successfully updated user!", helpers.DataHelper(foundUser))
}
