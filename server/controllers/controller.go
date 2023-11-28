package controllers

import (
	"net/http"
	"solitude/database"
	"solitude/middleware"
	"solitude/models"

	"github.com/gin-gonic/gin"
	"github.com/go-playground/validator/v10"
	"github.com/google/uuid"
)

var Validate = validator.New()

func HashPassword(password string) string {
	return ""
}
func VerifyPassword(userPassword string, givenPassword string) (bool, string) {
	return false, ""
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
	body.UserID = []byte(body.UserID)

	token, refreshToken, _ := middleware.TokenGenerator(body.Email, body.FirstName, body.LastName, string(body.UserID))
	body.Token = &token
	body.RefreshToken = &refreshToken

	body.UserCart = make([]models.ProductUser, 0)
	body.AddressDetails = make([]models.Address, 0)
	body.OrderStatus = make([]models.Order, 0)

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
	var body models.User

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

	token, refreshToken, _ := middleware.TokenGenerator(existingUser.Email, existingUser.FirstName, existingUser.LastName, existingUser.UserID)

	middleware.UpdateAllTokens(token, refreshToken, string(existingUser.UserID))

	ctx.JSON(http.StatusFound, gin.H{
		"message": "Logged in successfully!",
		"success": true,
		"status":  http.StatusOK,
		"body":    body,
	})
}

func AddProduct(ctx *gin.Context) {
}

func SearchProduct(ctx *gin.Context) {
}

func SearchProductByQuery(ctx *gin.Context) {
}

func ProductViewAdmin(ctx *gin.Context) {}
