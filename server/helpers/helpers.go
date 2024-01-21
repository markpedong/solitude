package helpers

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func ErrJSONResponse(ctx *gin.Context, status int, message string) {
	ctx.JSON(status, gin.H{
		"message": message,
		"success": false,
		"status":  status,
	})
}

func JSONResponse(ctx *gin.Context, data interface{}, optionalMessage ...string) {
	message := "success"
	if len(optionalMessage) > 0 {
		message = optionalMessage[0]
	}

	response := gin.H{
		"message": message,
		"success": true,
		"status":  http.StatusOK,
	}

	if data != nil {
		response["data"] = data
	}

	ctx.JSON(http.StatusOK, response)
}
