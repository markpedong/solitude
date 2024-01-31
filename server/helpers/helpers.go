package helpers

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func ErrJSONResponse(ctx *gin.Context, status int, message string) {
	ctx.AbortWithStatusJSON(status, gin.H{
		"message": message,
		"success": false,
		"status":  status,
	})
}

func JSONResponse(ctx *gin.Context, optionalMessage string, jsonData ...map[string]interface{}) {
	message := "success"

	if optionalMessage != "" {
		message = optionalMessage
	}

	response := gin.H{
		"message": message,
		"success": true,
		"status":  http.StatusOK,
	}

	if len(jsonData) > 0 && jsonData[0] != nil {
		for key, value := range jsonData[0] {
			response[key] = value
		}
	}

	ctx.JSON(http.StatusOK, response)
}

func DataHelper(data interface{}) map[string]interface{} {
	q := map[string]interface{}{
		"data": data,
	}

	return q

}
