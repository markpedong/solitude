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
		users.POST("/getAllProductsByID", controllers.GetAllProductsBySellerID)
	}

	api := r.Group("/api")
	api.Use(middleware.Authentication)
	{
		api.POST("/checkout", controllers.CheckoutOrder)
		api.POST("/add-product", controllers.AddProducts)
		api.POST("/uploadImage", controllers.UploadImage)
		api.POST("/updateUser", controllers.UserUpdate)
		api.POST("/updateSeller", controllers.SellerUpdate)
	}

	cart := r.Group("/cart")
	cart.Use(middleware.Authentication)
	{
		cart.POST("/get", controllers.GetItemsFromCart)
		cart.POST("/add", controllers.AddToCart)
		cart.POST("/remove", controllers.RemoveItemFromCart)
		api.POST("/orders", controllers.GetOrders)
	}

	delivery := r.Group("/delivery")
	delivery.Use(middleware.Authentication)
	{
		delivery.POST("/add", controllers.AddDeliveryInfo)
		delivery.POST("/edit", controllers.EditDeliveryInfo)
		delivery.POST("/get", controllers.GetDeliveryInfo)
		delivery.POST("/delete", controllers.DeleteDeliveryInfo)
	}

	variations := r.Group("/variations")
	variations.Use(middleware.Authentication)
	{
		variations.POST("/add", controllers.AddVariation)
		variations.POST("/get", controllers.GetVariationsByID)
		variations.POST("/delete", controllers.DeleteVariation)
		variations.POST("/update", controllers.UpdateVariation)
	}
}
