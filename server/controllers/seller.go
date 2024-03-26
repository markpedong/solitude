package controllers

import (
	"net/http"
	"solitude/database"
	"solitude/helpers"
	"solitude/models"
	"solitude/tokens"

	"github.com/gin-gonic/gin"
)

func GetSellerData(ctx *gin.Context) {
	var body struct {
		SellerID string `json:"seller_id"`
	}
	if err := helpers.BindValidateJSON(ctx, &body); err != nil {
		return
	}

	var foundSeller models.Seller
	var productCount int64
	var sellerReview []models.SellerReviews
	if err := database.DB.Where("seller_id = ?", body.SellerID).First(&foundSeller).Error; err != nil {
		helpers.ErrJSONResponse(ctx, http.StatusNotFound, "seller not found")
		return
	}
	if err := database.DB.Model(&models.Product{}).Where("seller_id = ?", foundSeller.SellerID).Count(&productCount).Error; err != nil {
		helpers.ErrJSONResponse(ctx, http.StatusBadRequest, err.Error())
		return
	}
	if err := database.DB.Find(&sellerReview, "seller_id = ?", foundSeller.SellerID).Error; err != nil {
		helpers.ErrJSONResponse(ctx, http.StatusInternalServerError, err.Error())
		return
	}

	response := models.JSONSeller{
		SellerID:   foundSeller.SellerID,
		CreatedAt:  foundSeller.CreatedAt,
		UpdatedAt:  foundSeller.UpdatedAt,
		SellerName: foundSeller.SellerName,
		Phone:      foundSeller.Phone,
		Location:   foundSeller.Location,
		Rating:     len(sellerReview),
		Avatar:     foundSeller.Avatar,
		Email:      foundSeller.Email,
		Products:   productCount,
		Username:   foundSeller.Username,
		Followers:  foundSeller.Followers,
	}

	helpers.JSONResponse(ctx, "", helpers.DataHelper(response))
}

func SellerUpdate(ctx *gin.Context) {
	var body models.Seller
	if err := helpers.BindValidateJSON(ctx, &body); err != nil {
		return
	}

	if body.SellerID == "" {
		helpers.ErrJSONResponse(ctx, http.StatusBadRequest, "invalid ID")
		return
	}

	var existingSeller models.Seller
	if err := database.DB.Model(&existingSeller).Where("seller_id = ?", body.SellerID).First(&existingSeller).Error; err != nil {
		helpers.ErrJSONResponse(ctx, http.StatusInternalServerError, err.Error())
		return
	}

	if body.Email != existingSeller.Email && body.Email != "" && helpers.ExistingFields("email", body.Email) {
		helpers.ErrJSONResponse(ctx, http.StatusBadRequest, emailExist)
		return
	}
	if body.Phone != existingSeller.Phone && body.Phone != "" && helpers.ExistingFields("phone", body.Phone) {
		helpers.ErrJSONResponse(ctx, http.StatusBadRequest, phoneExist)
		return
	}
	if body.Username != existingSeller.Username && body.Username != "" && helpers.ExistingFields("username", body.Username) {
		helpers.ErrJSONResponse(ctx, http.StatusBadRequest, usernameExist)
		return
	}

	if err := database.DB.Model(&existingSeller).Where("seller_id = ?", body.SellerID).Updates(map[string]interface{}{
		"seller_name": body.SellerName,
		"username":    body.Username,
		"email":       body.Email,
		"phone":       body.Phone,
		"location":    body.Location,
		"avatar":      body.Avatar,
	}).Error; err != nil {
		helpers.ErrJSONResponse(ctx, http.StatusInternalServerError, err.Error())
		return
	}

	helpers.JSONResponse(ctx, "successfully updated user!")
}

func SellerSignup(ctx *gin.Context) {
	var body models.Seller
	if err := helpers.BindValidateJSON(ctx, &body); err != nil {
		return
	}

	if body.Email != "" && helpers.ExistingFields("email", body.Email) {
		helpers.ErrJSONResponse(ctx, http.StatusBadRequest, emailExist)
		return
	}
	if body.Phone != "" && helpers.ExistingFields("phone", body.Phone) {
		helpers.ErrJSONResponse(ctx, http.StatusBadRequest, phoneExist)
		return
	}
	if body.Username != "" && helpers.ExistingFields("username", body.Username) {
		helpers.ErrJSONResponse(ctx, http.StatusBadRequest, usernameExist)
		return
	}

	token, refreshToken, err := tokens.TokenGenerator(body.Email, body.SellerName, "", body.SellerID)
	if err != nil {
		helpers.ErrJSONResponse(ctx, http.StatusBadRequest, err.Error())
		return
	}

	newSeller := models.Seller{
		SellerID:   helpers.NewUUID(),
		SellerName: body.SellerName,
		Password:   body.Password,
		Email:      body.Email,
		Phone:      body.Phone,
		Username:   body.Username,
		Location:   body.Location,
		Products:   []models.Product{},
		Avatar:     body.Avatar,
	}

	if err := database.DB.Model(&models.Seller{}).Create(&newSeller).Error; err != nil {
		helpers.ErrJSONResponse(ctx, http.StatusInternalServerError, err.Error())
		return
	}

	newSeller.Password = HashPassword(body.Password)
	sellerRes := map[string]interface{}{
		"data":          newSeller,
		"token":         token,
		"refresh_token": refreshToken,
	}
	helpers.JSONResponse(ctx, "seller successfully created!", sellerRes)
}

func SellerLogin(ctx *gin.Context) {
	var body struct {
		Email    string `json:"email" validate:"required"`
		Password string `json:"password" validate:"required,min=6"`
	}
	if err := helpers.BindValidateJSON(ctx, &body); err != nil {
		return
	}

	var existingSeller models.Seller
	if err := database.DB.First(&existingSeller, "email = ?", body.Email).Error; err != nil {
		helpers.ErrJSONResponse(ctx, http.StatusBadRequest, err.Error())
		return
	}

	notValid, msg := VerifyPassword(existingSeller.Password, body.Password)
	if notValid {
		helpers.ErrJSONResponse(ctx, http.StatusBadRequest, msg)
		return
	}

	token, refreshToken, err := tokens.TokenGenerator(existingSeller.Email, existingSeller.SellerName, "", existingSeller.SellerID)
	if err != nil {
		helpers.ErrJSONResponse(ctx, http.StatusBadRequest, err.Error())
		return
	}

	userRes := map[string]interface{}{
		"data":          existingSeller,
		"token":         token,
		"refresh_token": refreshToken,
	}

	ctx.Header("token", token)
	helpers.JSONResponse(ctx, "", userRes)
}

func GetAllProductsBySellerID(ctx *gin.Context) {
	var body struct {
		SellerID string `json:"seller_id"`
	}
	if err := helpers.BindValidateJSON(ctx, &body); err != nil {
		return
	}

	var currProduct []models.Product
	if err := database.DB.Order("created_at DESC").Preload("Variations.Value").Find(&currProduct, "seller_id = ?", body.SellerID).Error; err != nil {
		helpers.ErrJSONResponse(ctx, http.StatusBadRequest, err.Error())
		return
	}

	helpers.JSONResponse(ctx, "", helpers.DataHelper(currProduct))
}

func GetAllSellers(ctx *gin.Context) {
	var sellers []models.Seller
	if err := database.DB.Preload("Products").Preload("Reviews").Order("RANDOM()").Find(&sellers).Error; err != nil {
		helpers.ErrJSONResponse(ctx, http.StatusInternalServerError, err.Error())
		return
	}

	var sellerResponse []models.JSONSeller
	for _, v := range sellers {
		seller := models.JSONSeller{
			SellerID:   v.SellerID,
			SellerName: v.SellerName,
			Products:   int64(len(v.Products)),
			Followers:  v.Followers,
			Avatar:     v.Avatar,
			Rating:     len(v.Reviews),
		}

		sellerResponse = append(sellerResponse, seller)
	}

	helpers.JSONResponse(ctx, "", helpers.DataHelper(sellerResponse))
}
