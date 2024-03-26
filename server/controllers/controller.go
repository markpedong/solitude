package controllers

import (
	"net/http"
	"solitude/database"
	"solitude/helpers"
	"solitude/models"
	"solitude/tokens"

	"github.com/gin-gonic/gin"
	"github.com/go-playground/validator/v10"
	"golang.org/x/crypto/bcrypt"
)

var Validate = validator.New()
var (
	emailExist    = "user with this email already exists!"
	usernameExist = "user with this username already exists!"
	phoneExist    = "user with this phoneNumber already exists!"
)

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
		return false, "Password matched!"
	// case errors.Is(_, bcrypt.ErrMismatchedHashAndPassword):
	// 	return false, "Password is incorrect!"
	case !err:
		return true, "Password is incorrect!"
	default:
		// fmt.Printf("Password verification error: %s\n", err)
		return true, "Failed to verify password"
	}
}

func CheckToken(ctx *gin.Context) {
	token := ctx.GetHeader("token")

	claims, err := tokens.ValidateToken(token)
	if err != "" {
		helpers.ErrJSONResponse(ctx, http.StatusInternalServerError, err)
		return
	}

	helpers.JSONResponse(ctx, "token verified!!", helpers.DataHelper(claims))
}

func AddNewsLetter(ctx *gin.Context) {
	var body struct {
		Email string `json:"email" validate:"required,email"`
	}
	if err := helpers.BindValidateJSON(ctx, &body); err != nil {
		return
	}
	if body.Email == "" {
		helpers.ErrJSONResponse(ctx, http.StatusInternalServerError, "email is required")
		return
	}

	newsLetterItem := models.NewsLetter{
		ID:    helpers.NewUUID(),
		Email: body.Email,
	}
	if err := database.DB.Create(&newsLetterItem).Error; err != nil {
		helpers.ErrJSONResponse(ctx, http.StatusInternalServerError, err.Error())
		return
	}

	helpers.JSONResponse(ctx, "")
}
