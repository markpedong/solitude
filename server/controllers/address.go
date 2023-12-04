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
	userID := ctx.Query("id")
	if userID == "" {
		ctx.JSON(http.StatusNotFound, gin.H{"error": "Invalid user ID"})
		return
	}

	var address models.Address
	if err := ctx.BindJSON(&address); err != nil {
		ctx.JSON(http.StatusNotAcceptable, gin.H{"error": err.Error()})
		return
	}

	address.AddressID = uuid.MustParse(userID)
	database.DB.Create(&address)

	var count int64
	database.DB.Model(&models.Address{}).
		//count all rows in the result set
		Select("COUNT(*)").
		Where("user_id = ?", userID).
		// creates another column and sort all the matches based on this group
		Group("address_id").
		// condition that returns all the address matched greater than or equal to 2
		Having("COUNT(*) >= 2").
		// store the count into the count variable
		Count(&count)

	if count < 2 {
		database.DB.Model(&models.Address{}).
			Where("user_id = ?", userID).
			Updates(map[string]interface{}{"address_id": address.AddressID})

		ctx.JSON(http.StatusOK, gin.H{"message": "Address added successfully"})
	} else {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "Not allowed"})
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
