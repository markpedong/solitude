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
	var body models.JSONAddProduct
	if err := helpers.BindValidateJSON(ctx, &body); err != nil {
		return
	}

	product := &models.Product{
		ProductID:   helpers.NewUUID(),
		SellerID:    body.SellerID,
		ProductName: body.ProductName,
		Price:       body.Price,
		Image:       pq.StringArray(body.Image),
		Description: body.Description,
		Stock:       body.Stock,
		Category:    pq.StringArray(body.Categories),
	}

	if err := database.DB.Create(&product).Error; err != nil {
		helpers.ErrJSONResponse(ctx, http.StatusInternalServerError, err.Error())
		return
	}

	var variationArr []models.ProductVariations
	for _, v := range body.Variations {
		variation := models.ProductVariations{
			ID:        helpers.NewUUID(),
			ProductID: product.ProductID,
			Label:     v.Label,
		}
		if err := database.DB.Create(&variation).Error; err != nil {
			helpers.ErrJSONResponse(ctx, http.StatusInternalServerError, err.Error())
			return
		}
		var variationValueArr []models.VariationValue
		for _, v := range v.Value {
			variationValue := models.VariationValue{
				ID:          helpers.NewUUID(),
				VariationID: variation.ID,
				Value:       v,
			}
			if err := database.DB.Create(&variationValue).Error; err != nil {
				helpers.ErrJSONResponse(ctx, http.StatusInternalServerError, err.Error())
				return
			}

			variationValueArr = append(variationValueArr, variationValue)
		}

		variation.Value = variationValueArr
		if err := database.DB.Save(&variation).Error; err != nil {
			helpers.ErrJSONResponse(ctx, http.StatusInternalServerError, err.Error())
			return
		}
		variationArr = append(variationArr, variation)

	}
	product.Variations = variationArr
	if err := database.DB.Save(&product).Error; err != nil {
		helpers.ErrJSONResponse(ctx, http.StatusInternalServerError, err.Error())
		return
	}

	helpers.JSONResponse(ctx, "successfully added product")
}

func EditProducts(ctx *gin.Context) {
	var body models.Product
	if err := helpers.BindValidateJSON(ctx, &body); err != nil {
		return
	}

	var product models.Product
	if err := database.DB.Preload("Variations.Value").First(&product).Error; err != nil {
		helpers.ErrJSONResponse(ctx, http.StatusInternalServerError, err.Error())
		return
	}

	// validate if the body variations is the same with product variations, if not then create new

	helpers.JSONResponse(ctx, "successfully edited product", helpers.DataHelper(product))
}

func GetAllProducts(ctx *gin.Context) {
	var body struct {
		Material     string `json:"material"`
		Price        int    `json:"price"`
		Gender       string `json:"gender"`
		SearchParams string `json:"search"`
	}
	if err := helpers.BindValidateJSON(ctx, &body); err != nil {
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
	if body.SearchParams != "" {
		// ARRAY[?]::text[] converts the single value "pants" into an array of strings, so that it can be compared to
		// the categories array.
		// @>checks if the array in the categories column contains the array "pants".
		// Convert the search parameter into a single-element array
		query = query.Where("category && ARRAY[?]", []string{body.SearchParams})
	}

	var productModels []models.Product
	if err := query.Find(&productModels).Error; err != nil {
		helpers.ErrJSONResponse(ctx, http.StatusInternalServerError, err.Error())
		return
	}

	products := make([]models.JSONProduct, len(productModels))
	for i, productModel := range productModels {
		products[i] = models.JSONProduct{
			ProductID:     productModel.ProductID,
			ProductName:   productModel.ProductName,
			Price:         productModel.Price,
			Description:   productModel.Description,
			Image:         []string(productModel.Image),
			Rating:        productModel.Rating,
			Discount:      productModel.Discount,
			DiscountPrice: productModel.DiscountPrice,
		}
		if len(products[i].Image) > 1 {
			products[i].Image = []string{products[i].Image[0]}
		}
	}

	helpers.JSONResponse(ctx, "", helpers.DataHelper(products))
}

func GetProductsDetailsByID(ctx *gin.Context) {
	var body struct {
		ID string `json:"product_id"`
	}
	if err := helpers.BindValidateJSON(ctx, &body); err != nil {
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
	if err := helpers.BindValidateJSON(ctx, &body); err != nil {
		return
	}

	var product models.Product
	if err := database.DB.First(&product, "product_id = ?", body.ProductID).Error; err != nil {
		helpers.ErrJSONResponse(ctx, http.StatusInternalServerError, "something went wrong when fetching data")
	}

	helpers.JSONResponse(ctx, "", helpers.DataHelper(product))
}
