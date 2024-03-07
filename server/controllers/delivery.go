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
	if err := database.DB.Model(&user).Association("DeliveryInformation").Find(&existingDeliveryInfo); err != nil {
		helpers.ErrJSONResponse(ctx, http.StatusInternalServerError, err.Error())
		return
	}

	helpers.JSONResponse(ctx, "", helpers.DataHelper(existingDeliveryInfo))
}

func AddDeliveryInfo(ctx *gin.Context) {
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

	var existingDeliveryInfo []models.DeliveryInformation
	if err := database.DB.Model(&user).Association("DeliveryInformation").Find(&existingDeliveryInfo); err != nil {
		helpers.ErrJSONResponse(ctx, http.StatusInternalServerError, err.Error())
		return
	}

	if len(existingDeliveryInfo) >= 3 {
		helpers.ErrJSONResponse(ctx, http.StatusBadRequest, "maximum delivery info exceeded, delete some.")
		return
	}

	newDeliveryInfo := models.DeliveryInformation{
		ID:      helpers.NewUUID(),
		UserID:  user.ID,
		House:   body.House,
		Street:  body.Street,
		City:    body.City,
		Pincode: body.PinCode,
	}

	if err := database.DB.Model(&user).Association("DeliveryInformation").Append(&newDeliveryInfo); err != nil {
		helpers.ErrJSONResponse(ctx, http.StatusInternalServerError, err.Error())
		return
	}

	helpers.JSONResponse(ctx, "addded info successfully!", helpers.DataHelper(existingDeliveryInfo))
}

func EditHomeAddress(ctx *gin.Context) {
	var body struct {
		DeliveryInfoID string  `json:"delivery_id" validate:"required"`
		UserID         string  `json:"user_id" validate:"required"`
		House          *string `json:"house"`
		Street         *string `json:"street"`
		City           *string `json:"city"`
		PinCode        *string `json:"pin_code"`
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
		if body.DeliveryInfoID == v.ID {
			found = true
			break
		}
	}

	if !found {
		helpers.ErrJSONResponse(ctx, http.StatusInternalServerError, "check delivery_id")
		return
	}

	var editDeliveryInfo models.DeliveryInformation
	if err := database.DB.First(&editDeliveryInfo, "id = ?", body.DeliveryInfoID).Error; err != nil {
		helpers.ErrJSONResponse(ctx, http.StatusInternalServerError, err.Error())
		return
	}

	editDeliveryInfo = models.DeliveryInformation{
		City:    body.City,
		House:   body.House,
		Pincode: body.PinCode,
		Street:  body.Street,
	}
	if err := database.DB.Save(&editDeliveryInfo).Error; err != nil {
		helpers.ErrJSONResponse(ctx, http.StatusInternalServerError, err.Error())
		return
	}

	helpers.JSONResponse(ctx, "edited successfully!")
}

func DeleteAddress(ctx *gin.Context) {
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
		helpers.ErrJSONResponse(ctx, http.StatusInternalServerError, "check address_id")
		return
	}

	if err := database.DB.Where("id = ?", body.DeliveryID).Find(&models.DeliveryInformation{}).Error; err != nil {
		helpers.ErrJSONResponse(ctx, http.StatusInternalServerError, err.Error())
		return
	}

	helpers.JSONResponse(ctx, "edited successfully!")
}
