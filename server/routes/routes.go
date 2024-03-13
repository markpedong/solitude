package routes

import (
	"solitude/controllers"
	"solitude/middleware"

	"github.com/gin-gonic/gin"
)

func UserRoutes(r *gin.Engine) {
	r.POST("/seller/products", controllers.GetAllProductsBySellerID)
	r.POST("/product/getDetails", controllers.GetProductsDetailsByID)

	public := r.Group("/public")
	{
		public.POST("/signup", controllers.UserSignup)
		public.POST("/login", controllers.UserLogin)
		public.POST("/loginSeller", controllers.SellerLogin)
		public.POST("/signupSeller", controllers.SellerSignup)
		public.POST("/products", controllers.GetAllProducts)
		// users.GET("/collections", controllers.GetAllCollections)
	}

	api := r.Group("/api")
	api.Use(middleware.Authentication)
	{
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
		cart.POST("/orders", controllers.GetOrders)
		cart.POST("/checkout", controllers.CheckoutOrder)

	}

	delivery := r.Group("/delivery")
	delivery.Use(middleware.Authentication)
	{
		delivery.POST("/add", controllers.AddDeliveryInfo)
		delivery.POST("/edit", controllers.EditDeliveryInfo)
		delivery.POST("/get", controllers.GetDeliveryInfo)
		delivery.POST("/delete", controllers.DeleteDeliveryInfo)
		delivery.POST("/setDefault", controllers.SetDefaultInfo)
	}

	rating := r.Group("/rating")
	{
		rating.POST("/get", controllers.GetProductRating)
		rating.POST("/update", controllers.UpdateProductRating)
		rating.POST("/delete", controllers.DeleteProductRating)
		rating.POST("/add", controllers.AddProductRating)
	}

	seller := r.Group("/seller")
	seller.Use(middleware.Authentication)
	{
		seller.POST("/getInfo", controllers.GetSellerData)

	}

	user := r.Group("/user")
	user.Use(middleware.Authentication)
	{
		user.POST("/getInfo", controllers.GetUserData)
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
