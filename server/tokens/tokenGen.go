package tokens

import (
	"os"
	"time"

	"github.com/golang-jwt/jwt"
)

type SignedDetails struct {
	Email     string
	FirstName string
	LastName  string
	Uid       string
	jwt.StandardClaims
}

var SECRET_KEY = os.Getenv("SECRET_KEY")

const (
	tokenDuration        = 24 * time.Hour
	refreshTokenDuration = 168 * time.Hour
)

func generateTokenClaims(email, firstName, lastName, uid string, duration time.Duration) jwt.Claims {
	return &SignedDetails{
		Email:     email,
		FirstName: firstName,
		LastName:  lastName,
		Uid:       uid,
		StandardClaims: jwt.StandardClaims{
			ExpiresAt: time.Now().Add(duration).Unix(),
		},
	}
}

func TokenGenerator(email, firstName, lastName, uid string) (signedToken, signedRefreshToken string, err error) {
	claims := generateTokenClaims(email, firstName, lastName, uid, tokenDuration)
	refreshClaims := generateTokenClaims("", "", "", "", refreshTokenDuration)

	token, err := jwt.NewWithClaims(jwt.SigningMethodHS256, claims).SignedString([]byte(SECRET_KEY))
	if err != nil {
		return "", "", err
	}

	refreshToken, err := jwt.NewWithClaims(jwt.SigningMethodES384, refreshClaims).SignedString([]byte(SECRET_KEY))
	if err != nil {
		return "", "", err
	}

	return token, refreshToken, nil
}

func ValidateToken(signedToken string) (claims *SignedDetails, msg string) {
	token, err := jwt.ParseWithClaims(signedToken, &SignedDetails{}, func(t *jwt.Token) (interface{}, error) {
		return []byte(SECRET_KEY), nil
	})

	if err != nil {
		msg = err.Error()
		return &SignedDetails{}, msg
	}

	claims, ok := token.Claims.(*SignedDetails)
	if !ok || !token.Valid {
		msg = "the token is invalid"
		return &SignedDetails{}, msg
	}

	if time.Now().Before(time.Unix(claims.ExpiresAt, 0)) {
		msg = "token is already expired"
		return claims, msg
	}

	return &SignedDetails{}, msg
}
