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
		ID string `json:"id"`
		FirstName string `json:"first_name"`
	}

	if err := ctx.ShouldBindJSON(&body); err != nil {
		helpers.ErrJSONResponse(ctx, http.StatusBadRequest, err.Error())
		return
	}

	var foundUser models.User
	if err := database.DB.Where("id = ?", body.ID).First(&models.User{}).Updates(map[string]interface{}{
		"first_name": body.FirstName,
		"last_name":  body.LastName}).Error; err != nil {
		helpers.ErrJSONResponse(ctx, http.StatusInternalServerError, err.Error())
		return
	}

	helpers.JSONResponse(ctx, "successfully updated user!", helpers.DataHelper(foundUser))
}
