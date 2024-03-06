package models

import (
	"time"

	"github.com/lib/pq"
)

type User struct {
	ID             string     `json:"id" gorm:"primaryKey"`
	CreatedAt      time.Time  `json:"created_at" gorm:"autoCreateTime:milli"`
	UpdatedAt      time.Time  `json:"updated_at" gorm:"autoUpdateTime:milli"`
	AddressDetails *[]Address `json:"address_details" gorm:"foreignKey:UserID"`
	Orders         *[]Orders  `json:"orders" gorm:"foreignKey:UserID"`
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
	CreatedAt   int                 `json:"created_at" gorm:"autoCreateTime:milli"`
	UpdatedAt   int                 `json:"updated_at" gorm:"autoUpdateTime:milli"`
	Description string              `json:"description" validate:"required"`
	Stock       int                 `json:"stock" validate:"required"`
	Variations  []ProductVariations `json:"variations" gorm:"foreignkey:ProductID"`
	Category    pq.StringArray      `json:"categories" gorm:"type:text[]"`
	CheckoutID  string              `json:"checkout_id"`
}
type JSONProduct struct {
	ProductID   string              `json:"product_id"`
	SellerID    string              `json:"seller_id" `
	ProductName string              `json:"product_name" `
	Price       float64             `json:"price" `
	Image       pq.StringArray      `json:"image" `
	Variations  []ProductVariations `json:"variations" `
	CheckoutID  string              `json:"checkout_id"`
}

type Address struct {
	AddressID string  `json:"id"  gorm:"primaryKey"`
	UserID    string  `json:"-"`
	House     *string `json:"house"`
	Street    *string `json:"street"`
	City      *string `json:"city"`
	Pincode   *string `json:"pin_code"`
}

type Seller struct {
	SellerID   string     `json:"seller_id" gorm:"primaryKey"`
	CreatedAt  time.Time  `json:"created_at" gorm:"autoCreateTime:milli"`
	UpdatedAt  time.Time  `json:"updated_at" gorm:"autoCreateTime:milli"`
	SellerName string     `json:"seller_name" validate:"max=30"`
	Password   string     `json:"password" validate:"required,min=6"`
	Email      string     `json:"email" validate:"required"`
	Phone      string     `json:"phone"`
	Username   string     `json:"username"`
	Location   string     `json:"location"`
	Products   *[]Product `json:"products" gorm:"foreignKey:SellerID"`
	Avatar     string     `json:"avatar"`
}

type VariationValue struct {
	VariationID string `json:"variation_id" validate:"required"`
	ID          string `json:"id" gorm:"primaryKey"`
	Value       string `json:"value" validate:"required"`
}

type ProductVariations struct {
	ID        string           `json:"id" gorm:"primaryKey"`
	ProductID string           `json:"product_id"`
	Label     string           `json:"label" validate:"required"`
	Value     []VariationValue `json:"value" gorm:"foreignKey:VariationID"`
}

type Collections struct {
	ID          string `json:"id" gorm:"primaryKey"`
	Title       string `json:"title" validate:"required"`
	Description string `json:"description" validate:"required"`
	Image       string `json:"image" validate:"required"`
	CreatedAt   int    `json:"created_at" gorm:"autoCreateTime:milli"`
}

type Carts struct {
	ID           string         `json:"id" gorm:"primaryKey"`
	ProductID    string         `json:"product_id" validate:"required"`
	UserID       string         `json:"user_id" validate:"required"`
	VariationIDs pq.StringArray `json:"variation_ids" gorm:"type:text[]"`
}

type Orders struct {
	OrderID         string         `json:"id" gorm:"primaryKey"`
	ProductID       string         `json:"product_id"`
	UserID          string         `json:"user_id"`
	VariationIDs    pq.StringArray `json:"variation_ids" gorm:"type:text[]"`
	OrderedAt       time.Time      `json:"ordered_at" gorm:"autoCreateTime:milli"`
	Price           int            `json:"price"`
	Discount        *int           `json:"discount"`
	PaymentMethod   int            `json:"payment_method"`
	SelectedAddress string         `json:"address" validate:"required"`
}
