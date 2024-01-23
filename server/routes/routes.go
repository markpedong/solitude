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
	}

	admin := r.Group("/admin")
	{
		admin.POST("/add-product", controllers.ProductViewAdmin)
	}

	public := r.Group("/public")
	{
		public.POST("/products", controllers.GetAllProducts)
	}

	api := r.Group("/api")
	api.Use(middleware.Authentication)
	{
		// api.POST("/add-to-cart", controllers.AddToCart)
		// api.GET("/remove-item", controllers.RemoveItem)
		// api.GET("/cart-checkout", controllers.BuyFromCart)
		// api.GET("/instant-buy", controllers.InstantBuy)
		// api.POST("/search", controllers.SearchProductByQuery)
		api.POST("/add-products", controllers.AddProducts)
		api.POST("/add-blog", controllers.AddBlog)
		api.GET("/blogs", controllers.GetAllBlog)
		api.GET("/collections", controllers.GetAllCollections)
		api.POST("/add-collection", controllers.AddCollection)
		api.GET("/product/:id", controllers.GetProductsByID)
		api.POST("/uploadImage", controllers.UploadImage)
		// api.GET("/image/:id", controllers.GetImage)
	}
}
