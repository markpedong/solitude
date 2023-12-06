package models

import (
	"time"

	"github.com/google/uuid"
)

type User struct {
	ID             uuid.UUID     `json:"id" gorm:"primaryKey"`
	FirstName      *string       `json:"first_name" validate:"required,min=2,max=30"`
	LastName       *string       `json:"last_name" validate:"required,min=2,max=30"`
	Password       *string       `json:"password" validate:"required,min=6"`
	Email          *string       `json:"email" validate:"email,required"`
	Phone          *string       `json:"phone" validate:"required"`
	Token          *string       `json:"token"`
	RefreshToken   *string       `json:"refresh_token"`
	CreatedAt      time.Time     `json:"created_at" gorm:"autoCreateTime"`
	UpdatedAt      time.Time     `json:"updated_at" gorm:"autoCreateTime"`
	UserID         []byte        `json:"user_id"`
	UserCart       []ProductUser `json:"user_cart" gorm:"foreignKey:ProductID"`
	AddressDetails []Address     `json:"address_details" gorm:"foreignKey:AddressID"`
	Orders         []Order       `json:"orders" gorm:"foreignKey:OrderID"`
}

type Product struct {
	ProductID   uuid.UUID `json:"id" gorm:"primaryKey;column:id"`
	ProductName *string   `json:"product_name"`
	Price       *uint64   `json:"price"`
	Rating      *uint8    `json:"rating"`
	Image       *string   `json:"image"`
}

type Address struct {
	AddressID uuid.UUID `json:"id"  gorm:"primaryKey;column:id"`
	House     *string   `json:"house"`
	Street    *string   `json:"street"`
	City      *string   `json:"city"`
	Pincode   *string   `json:"pin_code"`
}

type ProductUser struct {
	ProductID   uuid.UUID `json:"id" gorm:"primaryKey;column:id"`
	ProductName *string   `json:"product_name"`
	Price       int       `json:"price"`
	Rating      *uint     `json:"rating"`
	Image       *string   `json:"image"`
}

type Order struct {
	OrderID       uuid.UUID     `json:"id" gorm:"primaryKey;column:id"`
	OrderCart     []ProductUser `json:"order_cart" gorm:"foreignKey:ProductID"`
	OrderedAt     time.Time     `json:"ordered_at" gorm:"autoCreateTime"`
	Price         int           `json:"price"`
	Discount      *int          `json:"discount"`
	PaymentMethod Payment       `json:"payment_method" gorm:"foreignKey:ID"`
}

type Payment struct {
	ID      uuid.UUID `json:"id" gorm:"primaryKey"`
	Digital bool      `json:"digital"`
	COD     bool      `json:"cod"`
}
