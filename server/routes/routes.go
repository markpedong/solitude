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
	}

	admin := r.Group("/admin")
	{
		admin.POST("/add-products", controllers.AddProducts)
		admin.POST("/add-blog", controllers.AddBlog)
		admin.POST("/add-collection", controllers.AddCollection)
		admin.POST("/uploadImage", controllers.UploadImage)
	}

	api := r.Group("/api")
	{
		api.POST("/add-to-cart", controllers.AddToCart)
		api.GET("/remove-item", controllers.RemoveItem)
		api.GET("/cart-checkout", controllers.BuyFromCart)
		api.GET("/instant-buy", controllers.InstantBuy)
		api.POST("/search", controllers.SearchProductByQuery)
		api.POST("/products", controllers.GetAllProducts)
		api.GET("/blogs", controllers.GetAllBlog)
		api.GET("/collections", controllers.GetAllCollections)
		api.GET("/product/:id", controllers.GetProductsByID)
	}
}
