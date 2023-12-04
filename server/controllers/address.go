package controllers

import (
	"context"
	"net/http"
	"solitude/database"
	"solitude/models"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

func AddAddress(ctx *gin.Context) {
	var body struct {
		UserID string `json:"user_id"`
	}

	if err := ctx.BindJSON(&body); err != nil {
		ctx.AbortWithStatusJSON(http.StatusNotAcceptable, gin.H{"error": err.Error()})
		return
	}

	if body.UserID == "" {
		ctx.AbortWithStatusJSON(http.StatusNotFound, gin.H{"error": "Invalid ID"})
		return
	}

	var user models.User
	if err := database.DB.Where("id = ?", body.UserID).First(&user).Error; err != nil {
		ctx.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	var existingAddresses []models.Address
	// Establish connection with AddressDetails
	if err := database.DB.Model(&user).Association("AddressDetails").Find(&existingAddresses); err != nil {
		ctx.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	if len(existingAddresses) < 2 {
		// Create a new address with a new UUID
		newAddress := models.Address{
			AddressID: uuid.New(),
			// Populate other fields as needed
		}

		// Append the new address to the user's addresses
		if err := database.DB.Model(&user).Association("AddressDetails").Append(&newAddress); err != nil {
			ctx.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		ctx.JSON(http.StatusOK, gin.H{"message": "Address added successfully"})
	} else {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "Not Allowed"})
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
