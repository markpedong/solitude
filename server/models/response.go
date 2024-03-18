package models

import (
	"github.com/lib/pq"
)

type DeliveryInfoPayload struct {
	UserID      string `json:"user_id" validate:"required"`
	House       string `json:"house" validate:"required"`
	Street      string `json:"street" validate:"required"`
	City        string `json:"city" validate:"required"`
	Pincode     string `json:"pin_code" validate:"required"`
	AddressType int    `json:"address_type"`
	FirstName   string `json:"first_name" validate:"required"`
	LastName    string `json:"last_name" validate:"required"`
	Phone       string `json:"phone" validate:"required"`
}

type JSONProduct struct {
	ProductID     string              `json:"product_id"`
	SellerID      string              `json:"seller_id" `
	ProductName   string              `json:"product_name" `
	Price         float64             `json:"price" `
	Image         pq.StringArray      `json:"image" `
	Variations    []ProductVariations `json:"variations" `
	CheckoutID    string              `json:"checkout_id"`
	Quantity      int                 `json:"quantity"`
	Discount      int                 `json:"discount"`
	DiscountPrice int                 `json:"discount_price"`
	Rating        int                 `json:"rating"`
	Description   string              `json:"description" validate:"required"`
	Status        int                 `json:"status"`
	SellerName    string              `json:"seller_name"`
}

type JSONSeller struct {
	SellerID   string `json:"seller_id"`
	CreatedAt  int    `json:"created_at"`
	UpdatedAt  int    `json:"updated_at"`
	SellerName string `json:"seller_name"`
	Phone      string `json:"phone"`
	Location   string `json:"location"`
	Avatar     string `json:"avatar"`
	Email      string `json:"email"`
	Products   int64  `json:"products"`
	Username   string `json:"username"`
	Rating     int    `json:"rating"`
	Followers  int    `json:"followers"`
}

type OrderResponse struct {
	OrderID       string              `json:"order_id"`
	Discount      *int                `json:"discount"`
	DiscountPrice int                 `json:"discount_price"`
	Image         pq.StringArray      `json:"image" gorm:"type:text[]"`
	Price         int                 `json:"price"`
	ProductID     string              `json:"product_id"`
	ProductName   string              `json:"product_name" `
	Quantity      int                 `json:"quantity"`
	SellerID      string              `json:"seller_id"`
	SellerName    string              `json:"seller_name"`
	Status        int                 `json:"status"`
	Variations    []ProductVariations `json:"variations"`
	GroupID       string              `json:"group_id"`
}

type SingleOrderResponse struct {
	OrderResponse
	DeliveryInfo DeliveryInformation `json:"delivery_info"`
	ShippedAt    int                 `json:"shipped_at"`
	DeliveredAt  int                 `json:"delivered_at"`
	CompletedAt  int                 `json:"completed_at"`
	CreatedAt    int                 `json:"created_at"`
}