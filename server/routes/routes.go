package routes

import (
	"solitude/controllers"
	"solitude/middleware"

	"github.com/gin-gonic/gin"
)

func UserRoutes(r *gin.Engine) {
	users := r.Group("/users")
	{
		users.POST("/signup", controllers.Signup)
		users.POST("/login", controllers.Login)
		users.POST("/products", controllers.GetAllProducts)
		users.POST("/getUserData", controllers.GetUserData)
	}

	api := r.Group("/api")
	api.Use(middleware.Authentication)
	{
		// api.POST("/add-to-cart", controllers.AddToCart)
		// api.GET("/remove-item", controllers.RemoveItem)
		// api.GET("/cart-checkout", controllers.BuyFromCart)
		// api.GET("/instant-buy", controllers.InstantBuy)
		// api.POST("/search", controllers.SearchProductByQuery)
		api.POST("/add-product", controllers.AddProducts)
		// api.POST("/add-blog", controllers.AddBlog)
		// api.GET("/blogs", controllers.GetAllBlog)
		api.GET("/collections", controllers.GetAllCollections)
		api.GET("/product/:id", controllers.GetProductsByID)
		api.POST("/uploadImage", controllers.UploadImage)
		api.POST("/checkToken", controllers.CheckToken)
		api.POST("/updateUser", controllers.UpdateUser)
		// api.GET("/image/:id", controllers.GetImage)
	}
}
