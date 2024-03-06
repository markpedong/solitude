package controllers

import (
	"net/http"
	"solitude/database"
	"solitude/helpers"
	"solitude/models"

	"github.com/gin-gonic/gin"
)

func AddAddress(ctx *gin.Context) {
	var body struct {
		UserID  string  `json:"user_id" validate:"required"`
		House   *string `json:"house" validate:"required"`
		Street  *string `json:"street" validate:"required"`
		City    *string `json:"city" validate:"required"`
		PinCode *string `json:"pin_code" validate:"required"`
	}
	if err := helpers.BindValidateJSON(ctx, &body); err != nil {
		return
	}

	var user models.User
	if err := database.DB.Where("id = ?", body.UserID).First(&user).Error; err != nil {
		helpers.ErrJSONResponse(ctx, http.StatusInternalServerError, err.Error())
		return
	}

	var existingAddresses []models.Address
	if err := database.DB.Model(&user).Association("AddressDetails").Find(&existingAddresses); err != nil {
		helpers.ErrJSONResponse(ctx, http.StatusInternalServerError, err.Error())
		return
	}

	if len(existingAddresses) < 4 {
		newAddress := models.Address{
			AddressID: helpers.NewUUID(),
			House:     body.House,
			Street:    body.Street,
			City:      body.City,
			Pincode:   body.PinCode,
			UserID:    user.ID,
		}

		if err := database.DB.Model(&user).Association("AddressDetails").Append(&newAddress); err != nil {
			helpers.ErrJSONResponse(ctx, http.StatusInternalServerError, err.Error())
			return
		}
	} else {
		helpers.ErrJSONResponse(ctx, http.StatusBadRequest, "maximum address exceeded, delete some.")
	}

	helpers.JSONResponse(ctx, "addded address successfully!")
}

func EditHomeAddress(ctx *gin.Context) {
	var body struct {
		AddressID string  `json:"address_id" validate:"required"`
		UserID    string  `json:"user_id" validate:"required"`
		House     *string `json:"house"`
		Street    *string `json:"street"`
		City      *string `json:"city"`
		PinCode   *string `json:"pin_code"`
	}
	if err := helpers.BindValidateJSON(ctx, &body); err != nil {
		return
	}

	var user models.User
	if err := database.DB.Preload("AddressDetails").First(&user, "id = ?", body.UserID).Error; err != nil {
		helpers.ErrJSONResponse(ctx, http.StatusInternalServerError, err.Error())
		return
	}

	var found bool
	for _, v := range *user.AddressDetails {
		if body.AddressID == v.AddressID {
			found = true
			break
		}
	}

	if !found {
		helpers.ErrJSONResponse(ctx, http.StatusInternalServerError, "check address_id")
		return
	}

	var editAddress models.Address
	if err := database.DB.First(&editAddress, "id = ?", body.AddressID).Error; err != nil {
		helpers.ErrJSONResponse(ctx, http.StatusInternalServerError, err.Error())
		return
	}

	editAddress = models.Address{
		City:    body.City,
		House:   body.House,
		Pincode: body.PinCode,
		Street:  body.Street,
	}
	if err := database.DB.Save(&editAddress).Error; err != nil {
		helpers.ErrJSONResponse(ctx, http.StatusInternalServerError, err.Error())
		return
	}

	helpers.JSONResponse(ctx, "edited successfully!")
}

func DeleteAddress(ctx *gin.Context) {
	var body struct {
		AddressID string `json:"address_id" validate:"required"`
		UserID    string `json:"user_id" validate:"required"`
	}
	if err := helpers.BindValidateJSON(ctx, &body); err != nil {
		return
	}

	var user models.User
	if err := database.DB.Preload("AddressDetails").First(&user, "id = ?", body.UserID).Error; err != nil {
		helpers.ErrJSONResponse(ctx, http.StatusInternalServerError, err.Error())
		return
	}

	var found bool
	for _, v := range *user.AddressDetails {
		if body.AddressID == v.AddressID {
			found = true
			break
		}
	}

	if !found {
		helpers.ErrJSONResponse(ctx, http.StatusInternalServerError, "check address_id")
		return
	}

	if err := database.DB.Where("id = ?", body.AddressID).Find(&models.Address{}).Error; err != nil {
		helpers.ErrJSONResponse(ctx, http.StatusInternalServerError, err.Error())
		return
	}

	helpers.JSONResponse(ctx, "edited successfully!")
}
