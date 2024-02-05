package models

import (
	"time"

	"github.com/lib/pq"
)

type User struct {
	ID             string     `json:"id" gorm:"primaryKey"`
	CreatedAt      time.Time  `json:"created_at" gorm:"autoCreateTime"`
	UpdatedAt      time.Time  `json:"updated_at" gorm:"autoUpdateTime"`
	UserCart       *[]Product `json:"user_cart" gorm:"foreignKey:SellerID"`
	AddressDetails *[]Address `json:"address_details" gorm:"foreignKey:UserID"`
	Orders         *[]Order   `json:"orders" gorm:"foreignKey:UserID"`
	FirstName      string     `json:"first_name" validate:"max=10"`
	LastName       string     `json:"last_name" validate:"max=10"`
	Password       string     `json:"password" validate:"required,min=6"`
	Email          string     `json:"email" validate:"required"`
	Phone          string     `json:"phone"`
	Username       string     `json:"username"`
	Gender         string     `json:"gender"`
	Birthday       string     `json:"birthday"`
}

type Product struct {
	ProductID   string             `json:"product_id" gorm:"primaryKey"`
	SellerID    string             `json:"seller_id" validate:"required"`
	ProductName string             `json:"product_name" validate:"required"`
	Price       float64            `json:"price" validate:"required"`
	Rating      int                `json:"rating"`
	Image       pq.StringArray     `json:"image" gorm:"type:text[]"`
	CreatedAt   int                `json:"created_at" gorm:"autoCreateTime"`
	Description string             `json:"description" validate:"required"`
	Stock       int                `json:"stock" validate:"required"`
	Category    *[]ProductCategory `json:"category" gorm:"foreignKey:ProductID"`
}

type Address struct {
	AddressID string  `json:"id"  gorm:"primaryKey"`
	UserID    string  `json:"-"`
	House     *string `json:"house"`
	Street    *string `json:"street"`
	City      *string `json:"city"`
	Pincode   *string `json:"pin_code"`
}

type Order struct {
	OrderID       string    `json:"id" gorm:"primaryKey"`
	UserID        string    `json:"user_id"`
	OrderedAt     time.Time `json:"ordered_at" gorm:"autoCreateTime"`
	Price         int       `json:"price"`
	Discount      *int      `json:"discount"`
	PaymentMethod Payment   `json:"payment_method" gorm:"foreignKey:ID"`
	ProductID     string    `json:"product_id"`
}

type Seller struct {
	SellerID   string     `json:"seller_id" gorm:"primaryKey"`
	CreatedAt  time.Time  `json:"created_at" gorm:"autoCreateTime"`
	UpdatedAt  time.Time  `json:"updated_at" gorm:"autoCreateTime"`
	SellerName string     `json:"seller_name" validate:"max=10"`
	Password   string     `json:"password" validate:"required,min=6"`
	Email      string     `json:"email" validate:"required"`
	Phone      string     `json:"phone"`
	Username   string     `json:"username"`
	Location   string     `json:"location"`
	Products   *[]Product `json:"products" gorm:"foreignKey:SellerID"`
}
type Payment struct {
	ID      string `json:"id" gorm:"primaryKey"`
	Digital bool   `json:"digital"`
	COD     bool   `json:"cod"`
}

type ProductCategory struct {
	ID        string `json:"id" gorm:"primaryKey"`
	ProductID string `json:"product_id"`
	Label     string `json:"label" validate:"required"`
	Value     string `json:"value" validate:"required"`
}

type Collections struct {
	ID          string `json:"id" gorm:"primaryKey"`
	Title       string `json:"title" validate:"required"`
	Description string `json:"description" validate:"required"`
	Image       string `json:"image" validate:"required"`
	CreatedAt   int    `json:"created_at" gorm:"autoCreateTime"`
}
