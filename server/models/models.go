package models

import (
	"time"

	"github.com/lib/pq"
)

type User struct {
	ID        string    `json:"id" gorm:"primaryKey"`
	CreatedAt time.Time `json:"created_at" gorm:"autoCreateTime"`
	UpdatedAt time.Time `json:"updated_at" gorm:"autoCreateTime"`
	// UserCart       []Product `json:"user_cart" gorm:"foreignKey:ProductID"`
	// AddressDetails []Address `json:"address_details" gorm:"foreignKey:AddressID"`
	// Orders         []Order   `json:"orders" gorm:"foreignKey:OrderID"`
	FirstName string `json:"first_name" validate:"max=10"`
	LastName  string `json:"last_name" validate:"max=10"`
	Password  string `json:"password" validate:"required,min=6"`
	Email     string `json:"email" validate:"required"`
	Phone     string `json:"phone"`
	Username  string `json:"username"`
	Gender    string `json:"gender"`
	Birthday  string `json:"birthday"`
	Type      string `json:"type"`
}
type Seller struct {
	SellerID   string    `json:"seller_id" gorm:"primaryKey"`
	CreatedAt  time.Time `json:"created_at" gorm:"autoCreateTime"`
	UpdatedAt  time.Time `json:"updated_at" gorm:"autoCreateTime"`
	SellerName string    `json:"seller_name" validate:"max=10"`
	Password   string    `json:"password" validate:"required,min=6"`
	Email      string    `json:"email" validate:"required"`
	Phone      string    `json:"phone"`
	Username   string    `json:"username"`
	Location   string    `json:"location"`
	Brands     []Brands  `json:"brands" gorm:"foreignKey:BrandID"`
	Products   []Product `json:"products" gorm:"foreignKey:ProductID"`
	Type       string    `json:"type"`
}

type Brands struct {
	BrandID  string    `json:"id" gorm:"primaryKey"`
	Name     string    `json:"brand_name"`
	Products []Product `json:"products" gorm:"foreignKey:ProductID"`
}

type Product struct {
	ProductID   string         `json:"id" gorm:"primaryKey"`
	ProductName string         `json:"product_name" validate:"required"`
	Price       float64        `json:"price" validate:"required"`
	Rating      int            `json:"rating"`
	Image       pq.StringArray `json:"image" gorm:"type:text[]"`
	CreatedAt   int            `json:"created_at" gorm:"autoCreateTime"`
	Description string         `json:"description" validate:"required"`
	Stock       int            `json:"stock" validate:"required"`
	SellerID    string         `json:"seller_id" validate:"required"`
	BrandID     string         `json:"brand_id" validate:"required"`
}

type Address struct {
	AddressID string  `json:"id"  gorm:"primaryKey"`
	House     *string `json:"house"`
	Street    *string `json:"street"`
	City      *string `json:"city"`
	Pincode   *string `json:"pin_code"`
}

type Order struct {
	OrderID string `json:"id" gorm:"primaryKey"`
	// OrderCart     []Product `json:"order_cart" gorm:"foreignKey:ProductID"`
	OrderedAt     time.Time `json:"ordered_at" gorm:"autoCreateTime"`
	Price         int       `json:"price"`
	Discount      *int      `json:"discount"`
	PaymentMethod Payment   `json:"payment_method" gorm:"foreignKey:ID"`
	ProductID     string
}

type Payment struct {
	ID      string `json:"id" gorm:"primaryKey"`
	Digital bool   `json:"digital"`
	COD     bool   `json:"cod"`
}

type Collections struct {
	ID          string `json:"id" gorm:"primaryKey"`
	Title       string `json:"title" validate:"required"`
	Description string `json:"description" validate:"required"`
	Image       string `json:"image" validate:"required"`
	CreatedAt   int    `json:"created_at" gorm:"autoCreateTime"`
}
