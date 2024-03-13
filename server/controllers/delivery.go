package controllers

import (
	"net/http"
	"solitude/database"
	"solitude/helpers"
	"solitude/models"

	"github.com/gin-gonic/gin"
)

func GetDeliveryInfo(ctx *gin.Context) {
	var body struct {
		UserID string `json:"user_id" validate:"required"`
	}
	if err := helpers.BindValidateJSON(ctx, &body); err != nil {
		return
	}

	var user models.User
	if err := database.DB.Where("id = ?", body.UserID).First(&user).Error; err != nil {
		helpers.ErrJSONResponse(ctx, http.StatusInternalServerError, err.Error())
		return
	}

	var existingDeliveryInfo []models.DeliveryInformation
	if err := database.DB.Order("created_at DESC").Model(&user).Association("DeliveryInformation").Find(&existingDeliveryInfo); err != nil {
		helpers.ErrJSONResponse(ctx, http.StatusInternalServerError, err.Error())
		return
	}

	helpers.JSONResponse(ctx, "", helpers.DataHelper(existingDeliveryInfo))
}

func AddDeliveryInfo(ctx *gin.Context) {
	var body models.DeliveryInfoPayload
	if err := helpers.BindValidateJSON(ctx, &body); err != nil {
		return
	}
	var user models.User
	if err := database.DB.Where("id = ?", body.UserID).First(&user).Error; err != nil {
		helpers.ErrJSONResponse(ctx, http.StatusInternalServerError, err.Error())
		return
	}

	var existingDeliveryInfo []models.DeliveryInformation
	if err := database.DB.Model(&user).Association("DeliveryInformation").Find(&existingDeliveryInfo); err != nil {
		helpers.ErrJSONResponse(ctx, http.StatusInternalServerError, err.Error())
		return
	}

	if len(existingDeliveryInfo) >= 5 {
		helpers.ErrJSONResponse(ctx, http.StatusBadRequest, "maximum delivery info exceeded, delete some.")
		return
	}

	newDeliveryInfo := models.DeliveryInformation{
		ID:          helpers.NewUUID(),
		UserID:      user.ID,
		House:       body.House,
		Street:      body.Street,
		City:        body.City,
		Pincode:     body.Pincode,
		AddressType: body.AddressType,
		FirstName:   body.FirstName,
		LastName:    body.LastName,
		Phone:       body.Phone,
	}

	if err := database.DB.Model(&user).Association("DeliveryInformation").Append(&newDeliveryInfo); err != nil {
		helpers.ErrJSONResponse(ctx, http.StatusInternalServerError, err.Error())
		return
	}

	helpers.JSONResponse(ctx, "addded info successfully!")
}

func EditDeliveryInfo(ctx *gin.Context) {
	var body struct {
		models.DeliveryInfoPayload
		DeliveryInfoID string `json:"delivery_id"`
	}
	if err := helpers.BindValidateJSON(ctx, &body); err != nil {
		return
	}

	var editDeliveryInfo models.DeliveryInformation
	if err := database.DB.First(&editDeliveryInfo, "id = ?", body.DeliveryInfoID).Error; err != nil {
		helpers.ErrJSONResponse(ctx, http.StatusInternalServerError, err.Error())
		return
	}

	updatedDeliveryInfo := models.DeliveryInformation{
		City:        body.City,
		House:       body.House,
		Pincode:     body.Pincode,
		Street:      body.Street,
		FirstName:   body.FirstName,
		LastName:    body.LastName,
		Phone:       body.Phone,
		AddressType: body.AddressType,
	}
	if err := database.DB.Model(&editDeliveryInfo).Updates(&updatedDeliveryInfo).Error; err != nil {
		helpers.ErrJSONResponse(ctx, http.StatusInternalServerError, err.Error())
		return
	}

	helpers.JSONResponse(ctx, "edited successfully!")
}

func DeleteDeliveryInfo(ctx *gin.Context) {
	var body struct {
		DeliveryID string `json:"delivery_id" validate:"required"`
		UserID     string `json:"user_id" validate:"required"`
	}
	if err := helpers.BindValidateJSON(ctx, &body); err != nil {
		return
	}

	var user models.User
	if err := database.DB.Preload("DeliveryInformation").First(&user, "id = ?", body.UserID).Error; err != nil {
		helpers.ErrJSONResponse(ctx, http.StatusInternalServerError, err.Error())
		return
	}

	var found bool
	for _, v := range user.DeliveryInformation {
		if body.DeliveryID == v.ID {
			found = true
			break
		}
	}

	if !found {
		helpers.ErrJSONResponse(ctx, http.StatusInternalServerError, "check delivery_id")
		return
	}

	if err := database.DB.Where("id = ?", body.DeliveryID).Delete(&models.DeliveryInformation{}).Error; err != nil {
		helpers.ErrJSONResponse(ctx, http.StatusInternalServerError, err.Error())
		return
	}

	helpers.JSONResponse(ctx, "deleted successfully!")
}

func SetDefaultInfo(ctx *gin.Context) {
	var body struct {
		DeliveryID string `json:"delivery_id" validate:"required"`
	}
	if err := helpers.BindValidateJSON(ctx, &body); err != nil {
		return
	}

	var currInfo models.DeliveryInformation
	if err := database.DB.First(&currInfo, "id = ?", body.DeliveryID).Error; err != nil {
		helpers.ErrJSONResponse(ctx, http.StatusInternalServerError, err.Error())
		return
	}

	var user models.User
	if err := database.DB.Preload("DeliveryInformation").First(&user, "id = ?", currInfo.UserID).Error; err != nil {
		helpers.ErrJSONResponse(ctx, http.StatusInternalServerError, err.Error())
		return
	}

	for _, v := range user.DeliveryInformation {
		if v.AddressType == 1 {
			v.AddressType = 0
			database.DB.Save(&v)
		} else {
			// No need to update AddressType if it's not equal to 1
			continue
		}
	}

	currInfo.AddressType = 1
	database.DB.Save(&currInfo)
	helpers.JSONResponse(ctx, "", helpers.DataHelper(currInfo))
}
