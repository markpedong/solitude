package tokens

import (
	"context"
	"log"
	"os"
	"solitude/database"
	"solitude/models"
	"time"

	"github.com/golang-jwt/jwt"
	"github.com/google/uuid"
)

type SignedDetails struct {
	Email     string
	FirstName string
	LastName  string
	Uid       string
	jwt.StandardClaims
}

var SECRET_KEY = os.Getenv("SECRET_KEY")

func TokenGenerator(email, firstName, lastName *string, uid uuid.UUID) (signedToken string, signedRefreshToken string, err error) {
	claims := &SignedDetails{
		Email:     *email,
		FirstName: *firstName,
		LastName:  *lastName,
		Uid:       uid.String(),
		StandardClaims: jwt.StandardClaims{
			ExpiresAt: time.Now().Local().Add(time.Hour * time.Duration(24)).Unix(),
		},
	}
	refreshClaims := &SignedDetails{
		StandardClaims: jwt.StandardClaims{
			ExpiresAt: time.Now().Local().Add(time.Hour * time.Duration(168)).Unix(),
		},
	}

	token, err := jwt.NewWithClaims(jwt.SigningMethodHS256, claims).SignedString([]byte(SECRET_KEY))
	if err != nil {
		return "", "", err
	}

	refreshToken, err := jwt.NewWithClaims(jwt.SigningMethodES384, refreshClaims).SignedString([]byte(SECRET_KEY))
	if err != nil {
		log.Panic(err)
		return "", "", err
	}

	return token, refreshToken, nil
}

func ValidateToken(signedToken string) (claims *SignedDetails, msg string) {
	token, err := jwt.ParseWithClaims(signedToken, &SignedDetails{}, func(t *jwt.Token) (interface{}, error) {
		return []byte(SECRET_KEY), nil
	})
	if err != nil {
		msg := err.Error()
		return &SignedDetails{}, msg
	}

	// TOKEN.CLAIMS EXTRACT CLAIMS (KEY - VALUE) FROM TOKEN, SO WE NEED TO USE TYPE ASSERTION
	claims, ok := token.Claims.(*SignedDetails)
	if !ok {
		msg = "the token is invalid"
		return
	}
	if claims.ExpiresAt < time.Now().Unix() {
		msg = "token is already expired"
		return claims, msg
	}

	return &SignedDetails{}, msg
}

func UpdateToken(signedToken, signedRefreshToken, id string) {
	var ctx, cancel = context.WithTimeout(context.Background(), 100*time.Second)
	defer cancel()

	updateObj := map[string]interface{}{
		"token":         signedToken,
		"refresh_token": signedRefreshToken,
		"updated_at":    time.Now(),
	}

	result := database.DB.WithContext(ctx).Model(&models.User{}).Where("user_id = ?", id).Updates(updateObj)
	if result.Error != nil {
		log.Panic(result.Error)
		return
	}
}
