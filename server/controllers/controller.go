package controllers

import (
	"solitude/helpers"

	"github.com/gin-gonic/gin"
	"github.com/go-playground/validator/v10"
	"github.com/rs/xid"
	"golang.org/x/crypto/bcrypt"
)

var Validate = validator.New()
var Guid = xid.New()
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

func CheckToken(ctx *gin.Context) {
	token := ctx.GetHeader("token")

	helpers.JSONResponse(ctx, "token verified!!", helpers.DataHelper(token))
}
