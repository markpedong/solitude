package controllers

import (
	"net/http"
	"solitude/cloudinary"
	"solitude/database"
	"solitude/helpers"
	"solitude/models"

	"github.com/cloudinary/cloudinary-go/v2/api/uploader"
	"github.com/gin-gonic/gin"
	"github.com/lib/pq"
)

func AddProducts(ctx *gin.Context) {
	var body struct {
		ProductName string         `json:"product_name" validate:"required"`
		Price       float64        `json:"price" validate:"required"`
		Image       pq.StringArray `json:"image" gorm:"type:text[]"`
		Description string         `json:"description" validate:"required"`
		SellerID    string         `json:"product_id" validate:"required"`
	}
	if err := ctx.ShouldBindJSON(&body); err != nil {
		helpers.ErrJSONResponse(ctx, http.StatusBadRequest, err.Error())
		return
	}

	if err := Validate.Struct(&body); err != nil {
		helpers.ErrJSONResponse(ctx, http.StatusBadRequest, err.Error())
		return
	}

	product := &models.Product{
		ProductID:   body.SellerID,
		ProductName: body.ProductName,
		Price:       body.Price,
		Image:       body.Image,
		Description: body.Description,
	}

	if err := database.DB.Create(&product).Error; err != nil {
		helpers.ErrJSONResponse(ctx, http.StatusInternalServerError, err.Error())
		return
	}

	helpers.JSONResponse(ctx, "successfully added product", helpers.DataHelper(product))
}

func GetAllProductsByID(ctx *gin.Context) {
	var body struct {
		SellerID string `json:"seller_id"`
	}

	if err := ctx.ShouldBindJSON(&body); err != nil {
		helpers.ErrJSONResponse(ctx, http.StatusBadRequest, err.Error())
		return
	}

	var existingSeller models.Seller
	if err := database.DB.Preload("Products").Where("seller_id = ?", body.SellerID).First(&existingSeller).Error; err != nil {
		helpers.ErrJSONResponse(ctx, http.StatusBadRequest, err.Error())
		return
	}

	helpers.JSONResponse(ctx, "", helpers.DataHelper(existingSeller))
}

func GetAllProducts(ctx *gin.Context) {
	var body struct {
		Material string `json:"material"`
		Price    int    `json:"price"`
		Gender   string `json:"gender"`
	}

	if err := ctx.ShouldBindJSON(&body); err != nil {
		helpers.ErrJSONResponse(ctx, http.StatusBadRequest, err.Error())
		return
	}

	var query = database.DB.Order("created_at DESC")
	if body.Material != "" {
		query = query.Where("material = ?", body.Material)
	}
	if body.Price > 0 {
		query = query.Where("price <= ?", body.Price)
	}
	if body.Gender != "" {
		validGenders := map[string]bool{"male": true, "female": true, "others": true}

		if _, found := validGenders[body.Gender]; found {
			query = query.Where("gender = ?", body.Gender)
		} else {
			helpers.ErrJSONResponse(ctx, http.StatusBadRequest, "Invalid Gender! Please check")
			return
		}
	}

	var products []models.Product
	if err := query.
		Find(&products).
		Error; err != nil {
		helpers.ErrJSONResponse(ctx, http.StatusInternalServerError, err.Error())
		return
	}

	helpers.JSONResponse(ctx, "", helpers.DataHelper(products))
}

func GetProductsByID(ctx *gin.Context) {
	var body struct {
		ID string `json:"product_id"`
	}

	if err := ctx.ShouldBindJSON(&body); err != nil {
		helpers.ErrJSONResponse(ctx, http.StatusBadRequest, err.Error())
		return
	}

	var product models.Product
	if err := database.DB.Where("product_id = ?", body.ID).First(&product).Error; err != nil {
		helpers.ErrJSONResponse(ctx, http.StatusInternalServerError, err.Error())
		return
	}

	helpers.JSONResponse(ctx, "successfully got the product details!", helpers.DataHelper(product))
}

func UploadImage(ctx *gin.Context) {
	form, err := ctx.FormFile("file")

	if err != nil {
		helpers.ErrJSONResponse(ctx, http.StatusBadRequest, err.Error())
		return
	}

	uploadResult, err := cloudinary.CloudinaryService.Upload.Upload(ctx, form, uploader.UploadParams{Folder: "products"})
	if err != nil {
		helpers.ErrJSONResponse(ctx, http.StatusInternalServerError, err.Error())
		return
	}

	imageRes := map[string]interface{}{
		"url":      uploadResult.URL,
		"fileName": uploadResult.OriginalFilename,
		"size":     uploadResult.Bytes,
	}

	helpers.JSONResponse(ctx, "upload successful!", helpers.DataHelper(imageRes))
}

func SearchProductByQuery(ctx *gin.Context) {
	var body struct {
		ProductID string `json:"product_id"`
	}
	if err := ctx.ShouldBindJSON(&body); err != nil {
		helpers.ErrJSONResponse(ctx, http.StatusBadRequest, "check the JSON format!")
		return
	}

	var product models.Product
	if err := database.DB.First(&product, "id = ?", body.ProductID).Error; err != nil {
		helpers.ErrJSONResponse(ctx, http.StatusInternalServerError, "something went wrong when fetching data")
	}

	helpers.JSONResponse(ctx, "", helpers.DataHelper(product))
}
