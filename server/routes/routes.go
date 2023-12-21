package routes

import (
	"solitude/controllers"

	"github.com/gin-gonic/gin"
)

func UserRoutes(r *gin.Engine) {
	users := r.Group("/users")
	{
		users.POST("/signup", controllers.Signup)
		users.POST("/login", controllers.Login)
		users.GET("/search", controllers.GetAllProducts)
	}

	admin := r.Group("/admin")
	{
		admin.POST("/add-product", controllers.ProductViewAdmin)
	}

	api := r.Group("/api")
	{
		api.POST("/add-to-cart", controllers.AddToCart)
		api.GET("/remove-item", controllers.RemoveItem)
		api.GET("/cart-checkout", controllers.BuyFromCart)
		api.GET("/instant-buy", controllers.InstantBuy)
		api.POST("/search", controllers.SearchProductByQuery)
		api.POST("add-products", controllers.AddProducts)
	}
}
