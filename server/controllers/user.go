package controllers

import (
	"net/http"
	"solitude/helpers"
	"solitude/models"

	"github.com/gin-gonic/gin"
)

func UpdateUser(ctx *gin.Context) {
	var body models.User

	if err := ctx.ShouldBindJSON(&body); err != nil {
		helpers.ErrJSONResponse(ctx, http.StatusBadRequest, err.Error())
		return
	}

	helpers.JSONResponse(ctx, "successfully updated user!", helpers.DataHelper(body))
}
