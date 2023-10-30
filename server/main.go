package main

import (
	"fmt"

	"github.com/gin-gonic/gin"
)

func main() {
	fmt.Println("working")
	app := gin.Default()

	app.Run(":3001")

}
