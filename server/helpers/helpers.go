package helpers

import "github.com/gin-gonic/gin"

func ErrJsonResponse(ctx *gin.Context, status int, message string) {
	ctx.JSON(status, gin.H{
		"message": message,
		"success": false,
		"status":  status,
	})
}
