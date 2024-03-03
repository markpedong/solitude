package routes

import (
	"solitude/controllers"
	"solitude/middleware"

	"github.com/gin-gonic/gin"
)

func UserRoutes(r *gin.Engine) {
	users := r.Group("/users")
	{
		users.POST("/signup", controllers.UserSignup)
		users.POST("/login", controllers.UserLogin)
		users.POST("/loginSeller", controllers.SellerLogin)
		users.POST("/signupSeller", controllers.SellerSignup)
		users.POST("/products", controllers.GetAllProducts)
		users.GET("/collections", controllers.GetAllCollections)
		users.POST("/getUserData", controllers.GetUserData)
		users.POST("/getSellerData", controllers.GetSellerData)
		users.POST("/getProductData", controllers.GetProductsByID)
		users.POST("/getAllProductsByID", controllers.GetAllProductsByID)
	}

	api := r.Group("/api")
	api.Use(middleware.Authentication)
	{
		api.POST("/checkCart", controllers.GetItemsFromCart)
		api.POST("/addToCart", controllers.AddToCart)
		api.POST("/removeFromCart", controllers.RemoveItemFromCart)
		api.POST("/addVariations", controllers.AddVariation)
		api.POST("/getVariations", controllers.GetVariationsByID)
		api.POST("/deleteVariations", controllers.DeleteVariation)
		// api.GET("/cart-checkout", controllers.BuyFromCart)
		// api.GET("/instant-buy", controllers.InstantBuy)
		// api.POST("/search", controllers.SearchProductByQuery)
		api.POST("/add-product", controllers.AddProducts)
		// api.POST("/add-blog", controllers.AddBlog)
		// api.GET("/blogs", controllers.GetAllBlog)
		api.POST("/uploadImage", controllers.UploadImage)
		// api.POST("/checkToken", controllers.CheckToken)
		api.POST("/updateUser", controllers.UserUpdate)
		api.POST("/updateSeller", controllers.SellerUpdate)
		// api.GET("/image/:id", controllers.GetImage)
	}
}
