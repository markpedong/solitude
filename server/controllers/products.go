package controllers

import (
	"net/http"
	"solitude/cloudinary"
	"solitude/database"
	"solitude/helpers"
	"solitude/models"
	"time"

	"github.com/cloudinary/cloudinary-go/v2/api/uploader"
	"github.com/gin-gonic/gin"
)

func AddProducts(ctx *gin.Context) {
	var body models.Product
	if err := ctx.ShouldBindJSON(&body); err != nil {
		helpers.ErrJsonResponse(ctx, http.StatusBadRequest, err.Error())
		return
	}

	product := &models.Product{
		ProductID:   Guid.String(),
		ProductName: body.ProductName,
		Price:       body.Price,
		Image:       body.Image,
		Description: body.Description,
		CreatedAt:   int(time.Now().Unix()),
		Material:    body.Material,
		Gender:      body.Gender,
	}

	if err := database.DB.Create(&product).Error; err != nil {
		helpers.ErrJsonResponse(ctx, http.StatusInternalServerError, err.Error())
		return
	}

	ctx.JSON(http.StatusOK, gin.H{
		"message": "successfully added product",
		"success": true,
		"status":  http.StatusOK,
	})
}

func GetAllProducts(ctx *gin.Context) {
	var body struct {
		Material string `json:"material"`
		Price    int    `json:"price"`
		Gender   string `json:"gender"`
	}

	if err := ctx.ShouldBindJSON(&body); err != nil {
		helpers.ErrJsonResponse(ctx, http.StatusBadRequest, err.Error())
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
			ctx.JSON(http.StatusBadRequest, gin.H{
				"message": "Invalid Gender! Please check",
				"success": false,
				"status":  http.StatusBadRequest,
			})
			return
		}
	}

	var products []models.Product
	if err := query.
		Find(&products).
		Error; err != nil {
		helpers.ErrJsonResponse(ctx, http.StatusInternalServerError, err.Error())
		return
	}

	ctx.JSON(http.StatusOK, gin.H{
		"message": "success",
		"data":    products,
		"success": true,
		"status":  http.StatusOK,
	})
}

func GetProductsByID(ctx *gin.Context) {
	id := ctx.Param("id")

	var product models.Product
	if err := database.DB.Where("ID = ?", id).First(&product).Error; err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"message": err.Error(),
			"status":  http.StatusInternalServerError,
			"success": false,
		})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{
		"data":    product,
		"success": true,
		"message": "successfully got the product details!!",
		"status":  http.StatusOK,
	})
}

func UploadImage(ctx *gin.Context) {
	file, err := ctx.FormFile("file")
	if err != nil {
		helpers.ErrJsonResponse(ctx, http.StatusBadRequest, err.Error())
		return
	}

	uploadResult, err := cloudinary.CloudinaryService.Upload.Upload(ctx, file, uploader.UploadParams{Folder: "products"})
	if err != nil {
		helpers.ErrJsonResponse(ctx, http.StatusInternalServerError, err.Error())
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"url": uploadResult.URL, "success": true, "message": "success"})
}
