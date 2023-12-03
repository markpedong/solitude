package controllers

import (
	"context"
	"net/http"
	"solitude/database"
	"solitude/models"
	"time"

	"github.com/gin-gonic/gin"
)

func AddAddress(ctx *gin.Context) {
	var body struct {
		UserID string `json:"user_id"`
	}

	if body.UserID == "" {
		ctx.Header("Content-Type", "application/json")
		ctx.AbortWithStatusJSON(http.StatusBadRequest, gin.H{
			"message": "invalid id",
			"status":  http.StatusBadRequest,
			"success": false,
		})
	}

	var address models.Address
	if err := ctx.BindJSON(&address); err != nil {
		ctx.JSON(http.StatusNotAcceptable, gin.H{"error": err.Error()})
		return
	}

}

func EditHomeAddress(ctx *gin.Context) {}
func EdiWorkAddress(ctx *gin.Context)  {}

func DeleteAddress(ctx *gin.Context) {
	var body struct {
		AddressID string `json:"address_id" validate:"required"`
	}

	if err := Validate.Struct(body); err != nil {
		ctx.Header("Content-Type", "application/json")
		ctx.AbortWithStatusJSON(http.StatusBadRequest, gin.H{
			"message": err.Error(),
			"status":  http.StatusBadRequest,
			"success": false,
		})
	}

	cx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	addresses := make([]models.Address, 0)
	if err := database.DB.WithContext(cx).
		Model(&models.User{}).
		Where("id = ?", body.AddressID).
		Update("address_details", addresses).
		Error; err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"message": err.Error(),
			"status":  http.StatusInternalServerError,
			"success": false,
		})
	}

	ctx.JSON(http.StatusOK, gin.H{
		"message": "deleted successfully!!",
		"status":  http.StatusOK,
		"success": false,
	})
}
