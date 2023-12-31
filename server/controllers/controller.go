package controllers

import (
	"log"
	"net/http"
	"solitude/database"
	"solitude/models"
	"solitude/tokens"
	"strconv"

	"github.com/gin-gonic/gin"
	"github.com/go-playground/validator/v10"
	"github.com/google/uuid"
	"golang.org/x/crypto/bcrypt"
)

var Validate = validator.New()

func HashPassword(password string) string {
	hash, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		log.Panic(err)
		return ""
	}

	return string(hash)
}

func VerifyPassword(userPassword string, givenPassword string) (bool, string) {
	err := bcrypt.CompareHashAndPassword([]byte(givenPassword), []byte(userPassword))
	valid := true
	msg := ""

	if err != nil {
		valid = false
		msg = "Password is incorrect!!"
	}

	return valid, msg
}

func Signup(ctx *gin.Context) {
	var body models.User

	if err := ctx.ShouldBindJSON(&body); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"message": "Invalid JSON input",
			"success": false,
			"status":  http.StatusBadRequest,
		})
		return
	}

	if err := Validate.Struct(body); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"message": err.Error(),
			"success": false,
			"status":  http.StatusBadRequest,
		})
		return
	}

	var existingUser models.User
	result := database.DB.Where("email = ? OR phone = ?", body.Email, body.Phone).First(&existingUser)
	if result.RowsAffected > 0 {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"message": "User already exists!",
			"success": false,
			"status":  http.StatusBadRequest,
		})
		return
	}

	password := HashPassword(*body.Password)
	body.Password = &password

	body.ID = uuid.New()
	body.UserID = []byte(body.ID.String())
	token, refreshToken, _ := tokens.TokenGenerator(body.Email, body.FirstName, body.LastName, body.ID)
	body.Token = &token
	body.RefreshToken = &refreshToken

	body.UserCart = make([]models.ProductUser, 0)
	body.AddressDetails = make([]models.Address, 0)
	body.Orders = make([]models.Order, 0)

	// Save the new user to the database
	// if err := database.DB.Create(&body).Error; err != nil {
	// 	ctx.JSON(http.StatusInternalServerError, gin.H{
	// 		"message": "Failed to create user",
	// 		"success": false,
	// 		"status":  http.StatusInternalServerError,
	// 	})
	// 	return
	// }

	ctx.JSON(http.StatusCreated, gin.H{
		"message": "User has been created!",
		"success": true,
		"status":  http.StatusOK,
		"body":    body,
	})
}

func Login(ctx *gin.Context) {
	var body struct {
		Email    *string `json:"email"`
		Password *string `json:"password"`
	}

	if err := ctx.ShouldBindJSON(&body); err != nil {
		ctx.AbortWithStatusJSON(http.StatusBadRequest, gin.H{
			"message": "Invalid JSON input",
			"success": false,
			"status":  http.StatusBadRequest,
		})
		return
	}

	if err := Validate.Struct(body); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"message": err.Error(),
			"success": false,
			"status":  http.StatusBadRequest,
		})
		return
	}

	var existingUser models.User
	if err := database.DB.Where("email = ?", body.Email).First(&existingUser).Error; err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"message": "User not found!",
			"success": false,
			"status":  http.StatusBadRequest,
		})
		return
	}

	validPass, msg := VerifyPassword(*body.Password, *existingUser.Password)
	if !validPass {
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"message": msg,
			"success": false,
			"status":  http.StatusInternalServerError,
		})
		return
	}

	token, refreshToken, _ := tokens.TokenGenerator(existingUser.Email, existingUser.FirstName, existingUser.LastName, uuid.UUID(existingUser.UserID))

	tokens.UpdateToken(token, refreshToken, string(existingUser.UserID))

	ctx.JSON(http.StatusFound, gin.H{
		"message": "Logged in successfully!",
		"success": true,
		"status":  http.StatusOK,
		"body":    body,
	})
}

func SearchProductByQuery(ctx *gin.Context) {
	var body struct {
		ProductID string `json:"product_id"`
	}

	if err := ctx.ShouldBindJSON(&body); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"message": "check the JSON format!",
			"success": false,
		})
		return
	}

	if body.ProductID == "" {
		ctx.Header("Content-Type", "application/json")
		ctx.JSON(http.StatusNotFound, gin.H{
			"message": "invalid product_id",
			"success": false,
			"status":  http.StatusNotFound,
		})
		return
	}

	var product models.Product
	if err := database.DB.First(&product, "id = ?", body.ProductID).Error; err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"message": "something went wrong when fetching data",
			"success": false,
			"status":  http.StatusInternalServerError,
		})
	}

	ctx.JSON(http.StatusOK, gin.H{
		"data":    product,
		"success": true,
		"status":  http.StatusOK,
	})

}

func ProductViewAdmin(ctx *gin.Context) {
	var product models.Product

	if err := ctx.BindJSON(&product); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	product.ProductID = uuid.New()

	if err := database.DB.Create(&product).Error; err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Not Created"})
		return
	}

	ctx.JSON(http.StatusOK, "Successfully added our Product Admin!!")
}

func UploadImage(ctx *gin.Context) {
	file, err := ctx.FormFile("file")
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Generate a unique file name and save the file
	filePath := "uploads/" + uniqueFileName(file.Filename)
	if err := ctx.SaveUploadedFile(file, filePath); err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	// Save the file path in the database
	image := Image{Path: filePath}
	result := db.Create(&image)
	if result.Error != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": result.Error.Error()})
		return
	}

	// Return the image URL
	ctx.JSON(http.StatusOK, gin.H{"url": "/image/" + strconv.Itoa(int(image.ID))})
}

func GetImage(ctx *gin.Context) {
	var image Image
	if err := db.First(&image, ctx.Param("id")).Error; err != nil {
		ctx.JSON(http.StatusNotFound, gin.H{"error": "Image not found"})
		return
	}

	ctx.File(image.Path)
}
