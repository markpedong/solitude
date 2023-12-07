package main

import (
	"log"
	"os"
	"solitude/database"
	"solitude/routes"

	"github.com/gin-gonic/gin"
	_ "github.com/joho/godotenv/autoload"
)

func init() {
	database.DBSet()
}

func main() {
	r := gin.New()

	routes.UserRoutes(r)

	log.Fatal(r.Run(":" + os.Getenv("PORT")))
}
