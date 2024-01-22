package controllers

import (
	"errors"
	"log"
	"net/http"
	"solitude/database"
	"solitude/helpers"
	"solitude/models"
	"solitude/tokens"

	"github.com/gin-gonic/gin"
	"github.com/go-playground/validator/v10"
	"github.com/rs/xid"
	"golang.org/x/crypto/bcrypt"
)

var Validate = validator.New()
var Guid = xid.New()

func HashPassword(password string) string {
	hash, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		log.Panic(err)
		return ""
	}

	return string(hash)
}

func VerifyPassword(expectedPassword, givenPassword string) (bool, string) {
	err := bcrypt.CompareHashAndPassword([]byte(expectedPassword), []byte(givenPassword))
	valid := true
	msg := ""

	switch {
	case err == nil:
		return true, "Password matched!"
	case errors.Is(err, bcrypt.ErrMismatchedHashAndPassword):
		valid = false
		msg = "Password is incorrect!"
	default:
		valid = false
		msg = "Failed to verify password"
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

	password := HashPassword(body.Password)
	body.Password = password

	body.ID = Guid.String()
	token, refreshToken, _ := tokens.TokenGenerator(body.Email, body.FirstName, body.LastName, body.ID)

	body.UserCart = make([]models.ProductUser, 0)
	body.AddressDetails = make([]models.Address, 0)
	body.Orders = make([]models.Order, 0)

	if err := database.DB.Create(&body).Error; err != nil {
		helpers.ErrJSONResponse(ctx, http.StatusInternalServerError, "Failed to create user")
		return
	}

	ctx.JSON(http.StatusCreated, gin.H{
		"message":       "User has been created!",
		"success":       true,
		"status":        http.StatusOK,
		"data":          body,
		"token":         token,
		"refresh_token": refreshToken,
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
		helpers.ErrJSONResponse(ctx, http.StatusBadRequest, "User not found!")
		return
	}

	validPass, msg := VerifyPassword(*body.Password, existingUser.Password)
	if !validPass {
		ctx.JSON(http.StatusInternalServerError, gin.H{
			"message": msg,
			"success": false,
			"status":  http.StatusInternalServerError,
		})
		return
	}

	token, refreshToken, _ := tokens.TokenGenerator(existingUser.Email, existingUser.FirstName, existingUser.LastName, existingUser.ID)

	ctx.JSON(http.StatusFound, gin.H{
		"message":       "Logged in successfully!",
		"success":       true,
		"status":        http.StatusOK,
		"body":          body,
		"token":         token,
		"refresh_token": refreshToken,
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

	product.ProductID = Guid.String()

	if err := database.DB.Create(&product).Error; err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Not Created"})
		return
	}

	ctx.JSON(http.StatusOK, "Successfully added our Product Admin!!")
}
