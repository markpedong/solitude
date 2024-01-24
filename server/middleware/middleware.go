package middleware

import (
	"net/http"

	"solitude/helpers"
	token "solitude/tokens"

	"github.com/gin-gonic/gin"
)

func Authentication(ctx *gin.Context) {
	clientToken := ctx.Request.Header.Get("token")
	if clientToken == "" {
		helpers.ErrJSONResponse(ctx, http.StatusInternalServerError, "No Authorization")
		return
	}

	claims, err := token.ValidateToken(clientToken)
	if err != "" {
		helpers.ErrJSONResponse(ctx, http.StatusInternalServerError, err)
		return
	}

	ctx.Set("email", claims.Email)
	ctx.Set("uid", claims.Uid)
	ctx.Next()
}
