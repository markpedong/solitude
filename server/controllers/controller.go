package controllers

import (
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
		return err.Error()
	}

	return string(hash)
}

func VerifyPassword(expectedHashedPassword, givenPassword string) (bool, string) {
	// err := bcrypt.CompareHashAndPassword([]byte(expectedHashedPassword), []byte(givenPassword))
	err := expectedHashedPassword == givenPassword

	switch {
	case err:
		return true, "Password matched!"
	// case errors.Is(_, bcrypt.ErrMismatchedHashAndPassword):
	// 	return false, "Password is incorrect!"
	case !err:
		return false, "Password is incorrect!"
	default:
		// fmt.Printf("Password verification error: %s\n", err)
		return false, "Failed to verify password"
	}
}

func Signup(ctx *gin.Context) {
	userType := ctx.GetHeader("type")

	switch userType {
	case "1":
		var body struct {
			ID        string `json:"id" gorm:"primaryKey"`
			FirstName string `json:"first_name" validate:"required,max=10"`
			LastName  string `json:"last_name" validate:"required,max=10"`
			Password  string `json:"password" validate:"required,min=6"`
			Email     string `json:"email" validate:"required"`
			Phone     string `json:"phone"`
			Username  string `json:"username"`
		}
		if err := ctx.ShouldBindJSON(&body); err != nil {
			helpers.ErrJSONResponse(ctx, http.StatusBadRequest, "invalid JSON input")
			return
		}

		helpers.JSONResponse(ctx, "case success!!", helpers.DataHelper(body))
		return
	case "2":
		var body struct {
			SellerID   string `json:"seller_id" gorm:"primaryKey"`
			SellerName string `json:"seller_name" validate:"max=10"`
			Password   string `json:"password" validate:"required,min=6"`
			Email      string `json:"email" validate:"required"`
			Phone      string `json:"phone"`
			Username   string `json:"username"`
			Location   string `json:"location"`
		}
		if err := ctx.ShouldBindJSON(&body); err != nil {
			helpers.ErrJSONResponse(ctx, http.StatusBadRequest, "invalid JSON input")
			return
		}

		helpers.JSONResponse(ctx, "case success!!", helpers.DataHelper(body))
		return
	default:
		helpers.ErrJSONResponse(ctx, http.StatusBadRequest, "invalid type passed!!")
		return

	}
	// var body struct {
	// 	ID             string           `json:"id" gorm:"primaryKey"`
	// 	FirstName      string           `json:"first_name" validate:"required,max=10"`
	// 	LastName       string           `json:"last_name" validate:"required,max=10"`
	// 	Password       string           `json:"password" validate:"required,min=6"`
	// 	Email          string           `json:"email" validate:"required"`
	// 	Phone          string           `json:"phone"`
	// 	Username       string           `json:"username"`
	// }

	// if err := ctx.ShouldBindJSON(&body); err != nil {
	// 	helpers.ErrJSONResponse(ctx, http.StatusBadRequest, "invalid JSON input")
	// 	return
	// }

	// if err := Validate.Struct(body); err != nil {
	// 	helpers.ErrJSONResponse(ctx, http.StatusBadRequest, err.Error())
	// 	return
	// }

	// var existingUser models.User
	// if body.Phone != "" {
	// 	if err := database.DB.Where("phone = ?", body.Phone).First(&existingUser).Error; err == nil {
	// 		helpers.ErrJSONResponse(ctx, http.StatusBadRequest, "user with this phone number already exists!")
	// 		return
	// 	}
	// }

	// if body.Email != "" {
	// 	if err := database.DB.Where("email = ?", body.Email).First(&existingUser).Error; err == nil {
	// 		helpers.ErrJSONResponse(ctx, http.StatusBadRequest, "user with this email already exists!")
	// 		return
	// 	}
	// }

	// if body.Username != "" {
	// 	if err := database.DB.Where("username = ?", body.Username).First(&existingUser).Error; err == nil {
	// 		helpers.ErrJSONResponse(ctx, http.StatusBadRequest, "user with this username already exists!")
	// 		return
	// 	}
	// }

	// body.ID = Guid.String()
	// token, refreshToken, err := tokens.TokenGenerator(body.Email, body.FirstName, body.LastName, body.ID)
	// if err != nil {
	// 	helpers.ErrJSONResponse(ctx, http.StatusBadRequest, err.Error())
	// 	return
	// }

	// newUser := models.User{
	// 	ID:        body.ID,
	// 	FirstName: body.FirstName,
	// 	LastName:  body.LastName,
	// 	Password:  body.Password,
	// 	Email:     body.Email,
	// 	Phone:     body.Phone,
	// 	Username:  body.Username,
	// 	Type:      body.Type,
	// 	// UserCart:       make([]models.Product, 0),
	// 	// AddressDetails: make([]models.Address, 0),
	// 	// Orders:         make([]models.Order, 0),
	// }

	// if err := database.DB.Create(&newUser).Error; err != nil {
	// 	helpers.ErrJSONResponse(ctx, http.StatusInternalServerError, "Failed to create user")
	// 	return
	// }

	// newUser.Password = HashPassword(body.Password)
	// ctx.JSON(http.StatusOK, gin.H{
	// 	"message": "User has been created!",
	// 	"success": true,
	// 	"status":  http.StatusOK,
	// 	"data":    userType,
	// 	// "data":          newUser,
	// 	// "token":         token,
	// 	// "refresh_token": refreshToken,
	// })
}

func Login(ctx *gin.Context) {
	var body struct {
		Email    string `json:"email" validate:"required"`
		Password string `json:"password" validate:"required,min=6"`
		Type     int    `json:"type" validate:"required"`
	}

	if err := ctx.ShouldBindJSON(&body); err != nil {
		helpers.ErrJSONResponse(ctx, http.StatusBadRequest, "invalid JSON input")
		return
	}

	if err := Validate.Struct(&body); err != nil {
		helpers.ErrJSONResponse(ctx, http.StatusBadRequest, err.Error())
		return
	}

	baseQuery := database.DB.Where("email = ?", body.Email)

	switch body.Type {
	case 1:
		var existingUser models.User
		if err := baseQuery.First(&existingUser).Error; err != nil {
			helpers.ErrJSONResponse(ctx, http.StatusBadRequest, "user not found!")
			return
		}
		handleLogin(ctx, existingUser, body.Password, existingUser.FirstName, existingUser.LastName, existingUser.ID)

	case 2:
		var existingSeller models.Seller
		if err := baseQuery.First(&existingSeller).Error; err != nil {
			helpers.ErrJSONResponse(ctx, http.StatusBadRequest, "seller not found!")
			return
		}
		handleLogin(ctx, existingSeller, body.Password, existingSeller.SellerName, "", existingSeller.SellerID)

	default:
		helpers.ErrJSONResponse(ctx, http.StatusBadRequest, "invalid user type")
	}
}

func handleLogin(ctx *gin.Context, user interface{}, password, firstName, lastName, id string) {
	var validPass bool
	var msg string
	var email string

	switch v := user.(type) {
	case models.User:
		validPass, msg = VerifyPassword(v.Password, password)
		v.Password = ""
		email = v.Email
	case models.Seller:
		validPass, msg = VerifyPassword(v.Password, password)
		v.Password = ""
		email = v.Email
	default:
		helpers.ErrJSONResponse(ctx, http.StatusInternalServerError, "Invalid user type")
		return
	}

	if !validPass {
		helpers.ErrJSONResponse(ctx, http.StatusUnauthorized, msg)
		return
	}

	token, refreshToken, err := tokens.TokenGenerator(email, firstName, lastName, id)
	if err != nil {
		helpers.ErrJSONResponse(ctx, http.StatusInternalServerError, "Error generating tokens")
		return
	}

	res := map[string]interface{}{
		"data":          user,
		"token":         token,
		"refresh_token": refreshToken,
	}
	helpers.JSONResponse(ctx, "Logged in successfully", res)
}

func CheckToken(ctx *gin.Context) {
	token := ctx.GetHeader("token")

	helpers.JSONResponse(ctx, "token verified!!", helpers.DataHelper(token))
}
