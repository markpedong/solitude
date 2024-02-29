package models

import (
	"time"

	"github.com/lib/pq"
)

type User struct {
	ID             string     `json:"id" gorm:"primaryKey"`
	CreatedAt      time.Time  `json:"created_at" gorm:"autoCreateTime"`
	UpdatedAt      time.Time  `json:"updated_at" gorm:"autoUpdateTime"`
	Cart           []Product  `json:"cart"  gorm:"many2many:user_cart"`
	AddressDetails *[]Address `json:"address_details" gorm:"foreignKey:UserID"`
	Orders         *[]Order   `json:"orders" gorm:"foreignKey:UserID"`
	FirstName      string     `json:"first_name" validate:"max=30"`
	LastName       string     `json:"last_name" validate:"max=30"`
	Password       string     `json:"password" validate:"required,min=6"`
	Email          string     `json:"email" validate:"required"`
	Phone          string     `json:"phone"`
	Username       string     `json:"username"`
	Gender         string     `json:"gender"`
	Birthday       string     `json:"birthday"`
	Avatar         string     `json:"avatar"`
}

type Product struct {
	ProductID   string              `json:"product_id" gorm:"primaryKey"`
	SellerID    string              `json:"seller_id" validate:"required"`
	ProductName string              `json:"product_name" validate:"required"`
	Price       float64             `json:"price" validate:"required"`
	Rating      int                 `json:"rating"`
	Image       pq.StringArray      `json:"image" gorm:"type:text[]"`
	CreatedAt   int                 `json:"created_at" gorm:"autoCreateTime"`
	UpdatedAt   int                 `json:"updated_at" gorm:"autoUpdateTime"`
	Description string              `json:"description" validate:"required"`
	Stock       int                 `json:"stock" validate:"required"`
	Variations  []ProductVariations `json:"variations" gorm:"foreignkey:ProductID"`
	Category    pq.StringArray      `json:"categories" gorm:"type:text[]"`
}
type JSONProduct struct {
	ID          string              `json:"product_id"`
	ProductName string              `json:"product_name"`
	Variations  []ProductVariations `json:"variations"`
	Category    []string            `json:"categories"`
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
	SellerName string     `json:"seller_name" validate:"max=30"`
	Password   string     `json:"password" validate:"required,min=6"`
	Email      string     `json:"email" validate:"required"`
	Phone      string     `json:"phone"`
	Username   string     `json:"username"`
	Location   string     `json:"location"`
	Products   *[]Product `json:"products" gorm:"foreignKey:SellerID"`
	Avatar     string     `json:"avatar"`
}
type Payment struct {
	ID      string `json:"id" gorm:"primaryKey"`
	Digital bool   `json:"digital"`
	COD     bool   `json:"cod"`
}

type ProductVariations struct {
	ID        string         `json:"id" gorm:"primaryKey"`
	ProductID string         `json:"product_id"`
	Label     string         `json:"label" validate:"required"`
	Value     pq.StringArray `json:"value" validate:"required" gorm:"type:text[]"`
}

type Collections struct {
	ID          string `json:"id" gorm:"primaryKey"`
	Title       string `json:"title" validate:"required"`
	Description string `json:"description" validate:"required"`
	Image       string `json:"image" validate:"required"`
	CreatedAt   int    `json:"created_at" gorm:"autoCreateTime"`
}
