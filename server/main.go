package main

import (
	"log"
	"net/http"
	"os"
	"solitude/cloudinary"
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
		allowedOrigins := []string{"https://solitude-ph.vercel.app", "http://localhost:3000"}
		origin := c.Request.Header.Get("Origin")

		for _, allowedOrigin := range allowedOrigins {
			if origin == allowedOrigin {
				c.Writer.Header().Set("Access-Control-Allow-Origin", allowedOrigin)
				break
			}
		}

		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With, Token")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(http.StatusNoContent)
			return
		}

		c.Next()
	}
}

func main() {
	cloudinary.Init()

	r := gin.New()
	r.Use(CORSMiddleware())
	r.Use(gin.Logger())

	routes.UserRoutes(r)
	log.Fatal(r.Run(":" + os.Getenv("PORT")))
}
