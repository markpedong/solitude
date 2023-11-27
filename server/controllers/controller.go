package controllers

import (
	"context"
	"net/http"
	"solitude/database"
	"solitude/models"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/go-playground/validator/v10"
)

var Validate = validator.New()

func HashPassword(password string) string {
	return ""
}
func VerifyPassword(userPassword string, givenPassword string) (bool, string) {
	return false, ""
}

func Signup(ctx *gin.Context) {
	var _, cancel = context.WithTimeout(context.Background(), time.Second*10)
	defer cancel()

	var body models.User
	if err := ctx.ShouldBindJSON(&body); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"message": err.Error(),
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

	var user models.User
	result := database.DB.Where("email = ? OR phone = ?", body.Email, body.Phone).First(&user)
	if result.RowsAffected > 0 {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"message": "user already exist!!",
			"success": false,
			"status":  http.StatusBadRequest,
		})
		return
	}

	// password := HashPassword(*body.Password )

	ctx.JSON(http.StatusOK, gin.H{
		"message": user,
		"success": false,
		"status":  http.StatusOK,
		"body":    body,
	})

	defer cancel()
}

func Login(ctx *gin.Context) {
}

func AddProduct(ctx *gin.Context) {
}

func SearchProduct(ctx *gin.Context) {
}

func SearchProductByQuery(ctx *gin.Context) {
}

func ProductViewAdmin(ctx *gin.Context) {}
