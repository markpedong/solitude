package routes

import (
	"solitude/controllers"
	"solitude/middleware"

	"github.com/gin-gonic/gin"
)

func UserRoutes(r *gin.Engine) {
	r.POST("/seller/products", controllers.GetAllProductsBySellerID)
	r.POST("/seller/getInfo", controllers.GetSellerData)
	r.POST("/product/getDetails", controllers.GetProductsDetailsByID)

	public := r.Group("/public")
	{
		public.POST("/signup", controllers.UserSignup)
		public.POST("/login", controllers.UserLogin)
		public.POST("/loginSeller", controllers.SellerLogin)
		public.POST("/signupSeller", controllers.SellerSignup)
		public.POST("/products", controllers.GetAllProducts)
		public.POST("/brands", controllers.GetAllSellers)
		// users.GET("/collections", controllers.GetAllCollections)
	}

	api := r.Group("/api")
	api.Use(middleware.Authentication)
	{
		api.POST("/addProduct", controllers.AddProducts)
		api.POST("/editProduct", controllers.EditProducts)
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

	orders := r.Group("/orders")
	orders.Use(middleware.Authentication)
	{
		orders.POST("/getOrders", controllers.GetOrders)
		orders.POST("/getOrdersByID", controllers.GetOrdersByGroupID)
	}

	rating := r.Group("/rating")
	{
		rating.POST("/getReviews", controllers.GetRatings)
		rating.POST("/update", controllers.UpdateProductRating)
		rating.POST("/delete", controllers.DeleteProductRating)
		rating.POST("/add", controllers.AddProductRating)
		rating.POST("/rateSeller", controllers.AddSellerRating)
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
