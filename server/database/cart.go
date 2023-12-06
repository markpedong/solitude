package database

import (
	"errors"
	"log"
	"solitude/models"
	"time"

	"github.com/google/uuid"
)

var (
	ErrCantFindProduct    = errors.New("can't find the product")
	ErrCantDecodeProducts = errors.New("can't find the product")
	ErrUserIdIsNotValid   = errors.New("this user is not valid")
	ErrCantRemoveItemCart = errors.New("cannot add this product to cart")
	ErrCantGetItem        = errors.New("cannot remove this item from cart")
	ErrCantBuyCartItem    = errors.New("cannot update the purchase")
)

func AddProductToCart(productID uint, userID uint) error {
	var product models.Product
	result := DB.First(&product, productID)
	if result.Error != nil {
		log.Println(result.Error)
		return ErrCantFindProduct
	}

	var user models.User
	result = DB.First(&user, userID)
	if result.Error != nil {
		log.Println(result.Error)
		return ErrUserIdIsNotValid
	}

	userCart := models.ProductUser{
		ProductID: product.ProductID,
	}
	user.UserCart = append(user.UserCart, userCart)

	result = DB.Save(&user)
	if result.Error != nil {
		log.Println(result.Error)
		return ErrUserIdIsNotValid
	}

	return nil
}

func RemoveCartItem(productID uuid.UUID, userID uint) error {
	var user models.User
	result := DB.First(&user, userID)
	if result.Error != nil {
		log.Println(result.Error)
		return ErrUserIdIsNotValid
	}

	for i, item := range user.UserCart {
		if item.ProductID == productID {
			user.UserCart = append(user.UserCart[:i], user.UserCart[i+1:]...)
			break
		}
	}

	result = DB.Save(&user)
	if result.Error != nil {
		log.Println(result.Error)
		return ErrCantRemoveItemCart
	}

	return nil
}

func BuyItemsFromCart(userID uint) error {
	var user models.User
	if err := DB.Preload("UserCart").First(&user, userID).Error; err != nil {
		log.Println(err)
		return ErrUserIdIsNotValid
	}

	var totalPrice int
	for _, item := range user.UserCart {
		totalPrice += item.Price
	}

	// Create a new order
	order := models.Order{
		OrderID:       uuid.New(),
		OrderCart:     make([]models.ProductUser, 0),
		OrderedAt:     time.Now(),
		Price:         totalPrice,
		PaymentMethod: models.Payment{COD: true},
	}

	// Update user with the new order
	if err := DB.Model(&user).Association("Orders").Append(&order); err != nil {
		log.Println(err)
		return ErrCantBuyCartItem
	}

	// Update user with the new order
	if err := DB.Model(&user).Association("Orders").Append(&order); err != nil {
		log.Println(err)
		return ErrCantBuyCartItem
	}

	// Clear the user cart
	if err := DB.Model(&user).Association("UserCart").Clear(); err != nil {
		log.Println(err)
		return ErrCantBuyCartItem
	}

	return nil
}

func InstartBuyer() {}
