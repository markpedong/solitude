package middleware

import (
	"net/http"

	token "solitude/tokens"

	"github.com/gin-gonic/gin"
)

func Authentication(ctx *gin.Context) {
	clientToken := ctx.Request.Header.Get("token")
	if clientToken == "" {
		ctx.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{
			"error": "No Authorization",
		})
		return
	}

	claims, err := token.ValidateToken(clientToken)
	if err != "" {
		ctx.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{
			"error": err,
		})
		return
	}

	ctx.Set("email", claims.Email)
	ctx.Set("uid", claims.Uid)
	ctx.Next()
}
