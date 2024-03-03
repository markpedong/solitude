package controllers

import (
	"net/http"
	"solitude/cloudinary"
	"solitude/database"
	"solitude/helpers"
	"solitude/models"

	"github.com/cloudinary/cloudinary-go/v2/api/uploader"
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"github.com/lib/pq"
)

func AddProducts(ctx *gin.Context) {
	var body models.Product

	if err := ctx.ShouldBindJSON(&body); err != nil {
		helpers.ErrJSONResponse(ctx, http.StatusBadRequest, err.Error())
		return
	}

	if err := Validate.Struct(&body); err != nil {
		helpers.ErrJSONResponse(ctx, http.StatusBadRequest, err.Error())
		return
	}

	product := &models.Product{
		ProductID:   uuid.Must(uuid.NewRandom()).String(),
		SellerID:    body.SellerID,
		ProductName: body.ProductName,
		Price:       body.Price,
		Image:       pq.StringArray(body.Image),
		Description: body.Description,
		Stock:       body.Stock,
		Rating:      body.Rating,
		Category:    pq.StringArray(body.Category),
	}

	if err := database.DB.Create(&product).Error; err != nil {
		helpers.ErrJSONResponse(ctx, http.StatusInternalServerError, err.Error())
		return
	}
	for i := range body.Variations {
		variant := &models.ProductVariations{
			ID:        uuid.Must(uuid.NewRandom()).String(),
			ProductID: product.ProductID,
			Label:     body.Variations[i].Label,
			Value:     body.Variations[i].Value,
		}

		if err := database.DB.Create(variant).Error; err != nil {
			helpers.ErrJSONResponse(ctx, http.StatusInternalServerError, err.Error())
			return
		}

		product.Variations = append(product.Variations, *variant)
	}

	helpers.JSONResponse(ctx, "successfully added product", helpers.DataHelper(product))
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

	var productModels []models.Product
	if err := query.Find(&productModels).Error; err != nil {
		helpers.ErrJSONResponse(ctx, http.StatusInternalServerError, err.Error())
		return
	}

	type returnedProduct struct {
		ProductID   string   `json:"product_id"`
		ProductName string   `json:"product_name"`
		Price       float64  `json:"price"`
		Image       []string `json:"image"`
		Description string   `json:"description"`
		Rating      int      `json:"rating"`
	}
	products := make([]returnedProduct, len(productModels))
	for i, productModel := range productModels {
		products[i] = returnedProduct{
			ProductID:   productModel.ProductID,
			ProductName: productModel.ProductName,
			Price:       productModel.Price,
			Description: productModel.Description,
			Image:       []string(productModel.Image),
			Rating:      productModel.Rating,
		}
		if len(products[i].Image) > 1 {
			products[i].Image = []string{products[i].Image[0]}
		}
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
	if err := database.DB.Preload("Variations.Value").Where("product_id = ?", body.ID).First(&product).Error; err != nil {
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
	if err := database.DB.First(&product, "product_id = ?", body.ProductID).Error; err != nil {
		helpers.ErrJSONResponse(ctx, http.StatusInternalServerError, "something went wrong when fetching data")
	}

	helpers.JSONResponse(ctx, "", helpers.DataHelper(product))
}
