package main

import (
	"log"
	"net/http"
	"os"
	"solitude/database"
	"solitude/routes"

	"github.com/gin-gonic/gin"
	_ "github.com/joho/godotenv/autoload"
)

func init() {
	database.DBSet()
}

func CORSMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "http://localhost:3000")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(http.StatusNoContent)
			return
		}

		c.Next()
	}
}

func main() {
	r := gin.New()

	r.Use(CORSMiddleware())
	routes.UserRoutes(r)

	log.Fatal(r.Run(":" + os.Getenv("PORT")))
}
