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
		UserID  string  `json:"user_id"`
		House   *string `json:"house"`
		Street  *string `json:"street"`
		City    *string `json:"city"`
		PinCode *string `json:"pin_code"`
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
	// Establish connection with AddressDetails TABLE
	if err := database.DB.Model(&user).Association("AddressDetails").Find(&existingAddresses); err != nil {
		ctx.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	if len(existingAddresses) < 2 {
		newAddress := models.Address{
			AddressID: uuid.New(),
			House:     body.House,
			Street:    body.Street,
			City:      body.City,
			Pincode:   body.PinCode,
		}

		// Append the new address to the user's addresses
		if err := database.DB.Model(&user).Association("AddressDetails").Append(&newAddress); err != nil {
			ctx.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}

		// GORM automatically updates the user with the new address, no need for explicit update
		ctx.JSON(http.StatusOK, gin.H{"message": "Address added successfully"})
		return
	}

	ctx.JSON(http.StatusBadRequest, gin.H{"error": "Not Allowed"})
}

func EditHomeAddress(ctx *gin.Context) {
	var body struct {
		UserID  string  `json:"user_id"`
		House   *string `json:"house"`
		Street  *string `json:"street"`
		City    *string `json:"city"`
		PinCode *string `json:"pin_code"`
	}

	if err := ctx.BindJSON(&body); err != nil {
		ctx.IndentedJSON(http.StatusBadRequest, err.Error())
		return
	}

	if body.UserID == "" {
		ctx.Header("Content-Type", "application/json")
		ctx.JSON(http.StatusNotFound, gin.H{"Error": "Invalid"})
		ctx.Abort()
		return
	}

	var user models.User
	result := database.DB.Preload("AddressDetails").First(&user, "id = ?", body.City)
	if result.Error != nil {
		ctx.IndentedJSON(http.StatusInternalServerError, result.Error)
		return
	}

	var editAddress models.Address
	if err := ctx.BindJSON(&editAddress); err != nil {
		ctx.IndentedJSON(http.StatusBadRequest, err.Error())
		return
	}

	if len(user.AddressDetails) > 0 {
		user.AddressDetails[0].House = editAddress.House
		user.AddressDetails[0].Street = editAddress.Street
		user.AddressDetails[0].City = editAddress.City
		user.AddressDetails[0].Pincode = editAddress.Pincode
	} else {
		// Create a new address if the user doesn't have one
		editAddress.AddressID = user.ID
		user.AddressDetails = []models.Address{editAddress}
	}

	result = database.DB.Save(&user)
	if result.Error != nil {
		ctx.IndentedJSON(http.StatusInternalServerError, result.Error)
		return
	}

	ctx.IndentedJSON(http.StatusOK, "Successfully Updated the Home address")
}

func EdiWorkAddress(ctx *gin.Context) {}

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
