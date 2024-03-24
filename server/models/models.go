package models

import (
	"github.com/lib/pq"
	"gorm.io/plugin/soft_delete"
)

type User struct {
	ID                  string                `json:"id" gorm:"primaryKey"`
	CreatedAt           int                   `json:"created_at" gorm:"autoCreateTime"`
	UpdatedAt           int                   `json:"updated_at" gorm:"autoUpdateTime:milli"`
	DeliveryInformation []DeliveryInformation `json:"delivery_information" gorm:"foreignKey:UserID"`
	Orders              []Orders              `json:"orders" gorm:"foreignKey:UserID"`
	ProductReview       []ProductReviews      `json:"product_review" gorm:"foreignKey:UserID"`
	SellerReviews       []SellerReviews       `json:"seller_review" gorm:"foreignKey:UserID"`
	Carts               []Carts               `json:"cart" gorm:"foreignKey:UserID"`
	FirstName           string                `json:"first_name" validate:"max=30"`
	LastName            string                `json:"last_name" validate:"max=30"`
	Password            string                `json:"password" validate:"required,min=6"`
	Email               string                `json:"email" validate:"required"`
	Phone               string                `json:"phone"`
	Username            string                `json:"username"`
	Gender              string                `json:"gender"`
	Birthday            string                `json:"birthday"`
	Avatar              string                `json:"avatar"`
	DeletedAt           soft_delete.DeletedAt
}

type Product struct {
	ProductID     string                `json:"product_id" gorm:"primaryKey"`
	SellerID      string                `json:"seller_id" validate:"required"`
	ProductName   string                `json:"product_name" validate:"required"`
	Price         float64               `json:"price" validate:"required"`
	Rating        int                   `json:"rating"`
	Image         pq.StringArray        `json:"image" gorm:"type:text[]"`
	Description   string                `json:"description" validate:"required"`
	Stock         int                   `json:"stock" validate:"required"`
	Variations    []ProductVariations   `json:"variations" gorm:"foreignkey:ProductID"`
	Reviews       []ProductReviews      `json:"reviews" gorm:"foreignKey:ProductID"`
	Category      pq.StringArray        `json:"categories" gorm:"type:text[]"`
	CheckoutID    string                `json:"checkout_id"`
	CreatedAt     int                   `json:"created_at" gorm:"autoCreateTime"`
	UpdatedAt     int                   `json:"updated_at" gorm:"autoUpdateTime:milli"`
	Discount      int                   `json:"discount"`
	DiscountPrice int                   `json:"discount_price"`
	DeletedAt     soft_delete.DeletedAt `json:"-"  gorm:"softDelete:milli"`
}
type DeliveryInformation struct {
	ID          string                `json:"id" validate:"required"  gorm:"primaryKey"`
	UserID      string                `json:"user_id" validate:"required"`
	House       string                `json:"house" validate:"required"`
	Street      string                `json:"street" validate:"required"`
	City        string                `json:"city"`
	Pincode     string                `json:"pin_code" validate:"required"`
	AddressType int                   `json:"address_type"`
	FirstName   string                `json:"first_name" validate:"max=30, required"`
	LastName    string                `json:"last_name" validate:"max=30, required"`
	Phone       string                `json:"phone" validate:"required"`
	CreatedAt   int                   `json:"created_at" gorm:"autoCreateTime"`
	UpdatedAt   int                   `json:"updated_at" gorm:"autoUpdateTime:milli"`
	DeletedAt   soft_delete.DeletedAt `json:"-"  gorm:"softDelete:milli"`
}

type Seller struct {
	SellerID   string                `json:"seller_id" gorm:"primaryKey"`
	SellerName string                `json:"seller_name" validate:"max=30"`
	Password   string                `json:"password" validate:"required,min=6"`
	Email      string                `json:"email" validate:"required"`
	Phone      string                `json:"phone"`
	Username   string                `json:"username"`
	Location   string                `json:"location"`
	Products   *[]Product            `json:"products" gorm:"foreignKey:SellerID"`
	Avatar     string                `json:"avatar"`
	Rating     int                   `json:"rating"`
	Followers  int                   `json:"followers"`
	CreatedAt  int                   `json:"created_at" gorm:"autoCreateTime"`
	UpdatedAt  int                   `json:"updated_at" gorm:"autoUpdateTime:milli"`
	DeletedAt  soft_delete.DeletedAt `json:"-"  gorm:"softDelete:milli"`
	Orders     []Orders              `json:"orders" gorm:"foreignKey:SellerID"`
	Reviews    []SellerReviews       `json:"seller_review" gorm:"foreignKey:SellerID"`
}

type VariationValue struct {
	VariationID string `json:"variation_id" validate:"required"`
	ID          string `json:"id" gorm:"primaryKey"`
	Value       string `json:"value" validate:"required"`
}

type ProductVariations struct {
	ID            string           `json:"id" gorm:"primaryKey"`
	ProductID     string           `json:"product_id"`
	Label         string           `json:"label" validate:"required"`
	Value         []VariationValue `json:"value" gorm:"foreignKey:VariationID; constraint:OnUpdate:CASCADE,OnDelete:CASCADE"`
	SelectedValue string           `json:"selected_value" gorm:"-"`
}

type Collections struct {
	ID          string `json:"id" gorm:"primaryKey"`
	Title       string `json:"title" validate:"required"`
	Description string `json:"description" validate:"required"`
	Image       string `json:"image" validate:"required"`
	CreatedAt   int    `json:"created_at" gorm:"autoCreateTime"`
}

type Carts struct {
	ID           string                `json:"id" gorm:"primaryKey"`
	ProductID    string                `json:"product_id" validate:"required"`
	UserID       string                `json:"user_id" validate:"required"`
	VariationIDs pq.StringArray        `json:"variation_ids" gorm:"type:text[]"`
	Quantity     int                   `json:"quantity"`
	CreatedAt    int                   `json:"created_at" gorm:"autoCreateTime"`
	UpdatedAt    int                   `json:"updated_at" gorm:"autoUpdateTime:milli"`
	DeletedAt    soft_delete.DeletedAt `json:"-"  gorm:"softDelete:milli"`
}

type Orders struct {
	OrderID      string         `json:"id" gorm:"primaryKey"`
	ProductID    string         `json:"product_id"`
	UserID       string         `json:"user_id"`
	VariationIDs pq.StringArray `json:"variation_ids" gorm:"type:text[]"`
	Price        int            `json:"price"`
	Discount     *int           `json:"discount"`
	CreatedAt    int            `json:"created_at" gorm:"autoCreateTime"`
	Quantity     int            `json:"quantity"`
	SellerID     string         `json:"seller_id"`
	SellerName   string         `json:"seller_name"`
	GroupID      string         `json:"group_id"`
}

type OrderGroup struct {
	ID              string                `json:"id" gorm:"primaryKey"`
	Orders          []Orders              `json:"orders" gorm:"foreignKey:GroupID"`
	PaymentMethod   int                   `json:"payment_method"`
	SelectedAddress string                `json:"delivery_info" validate:"required"`
	ShippedAt       int                   `json:"shipped_at"`
	CreatedAt       int                   `json:"created_at" gorm:"autoCreateTime"`
	DeliveredAt     int                   `json:"delivered_at"`
	CompletedAt     int                   `json:"completed_at"`
	UpdatedAt       int                   `json:"updated_at" gorm:"autoUpdateTime:milli"`
	DeletedAt       soft_delete.DeletedAt `json:"-"  gorm:"softDelete:milli"`
	Status          int                   `json:"status"`
	Reviewed        int                   `json:"reviewed"`
	ReviewedSeller  int                   `json:"reviewed_seller"`
}

type ProductReviews struct {
	ID          string                `json:"id" gorm:"primaryKey"`
	Description string                `json:"description" validate:"required"`
	Rate        float64               `json:"rating" validate:"required"`
	CreatedAt   int                   `json:"created_at" gorm:"autoCreateTime"`
	UpdatedAt   int                   `json:"updated_at" gorm:"autoUpdateTime:milli"`
	DeletedAt   soft_delete.DeletedAt `json:"-"  gorm:"softDelete:milli"`
	Image       pq.StringArray        `json:"image" gorm:"type:text[]"`
	ProductID   string                `json:"-"`
	UserID      string                `json:"-"`
}

type SellerReviews struct {
	ID          string                `json:"id" gorm:"primaryKey"`
	Description string                `json:"description" validate:"required"`
	Rate        float64               `json:"rating" validate:"required"`
	CreatedAt   int                   `json:"created_at" gorm:"autoCreateTime"`
	UpdatedAt   int                   `json:"updated_at" gorm:"autoUpdateTime:milli"`
	DeletedAt   soft_delete.DeletedAt `json:"-"  gorm:"softDelete:milli"`
	SellerID    string                `json:"-"`
	UserID      string                `json:"-"`
}
