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

	var userByEmail models.User
	if err := database.DB.Where("email = ? AND phone = ?", body.Email, body.Phone).First(&userByEmail).Error; err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{
			"message": err.Error(),
			"success": false,
			"status":  http.StatusBadRequest,
		})
		return
	}

	// var userByPhone models.User
	// if err := database.DB.Where("phone = ?", *body.Phone).First(&userByPhone).Error; err != nil {
	// 	ctx.JSON(http.StatusBadRequest, gin.H{
	// 		"message": err.Error(),
	// 		"success": false,
	// 		"status":  http.StatusBadRequest,
	// 	})
	// 	return
	// }

	// CREATE AN INSERT TO DATABASE METHOD
	// https://www.youtube.com/watch?v=LdsTUecqFfo&list=PL5dTjWUk_cPaf5uSEmr8ilR-GtO6s7QJJ&index=6 10:12 timestamp

	ctx.JSON(http.StatusOK, gin.H{
		"message": "user fetched!!",
		"success": false,
		"status":  http.StatusOK,
		"data":    body,
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
