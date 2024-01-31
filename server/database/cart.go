package database

import (
	"errors"

	"github.com/rs/xid"
)

var (
	ErrCantFindProduct    = errors.New("can't find the product")
	ErrCantDecodeProducts = errors.New("can't find the product")
	ErrUserIDIsNotValid   = errors.New("this user is not valid")
	ErrCantRemoveItemCart = errors.New("cannot add this product to cart")
	ErrCantGetItem        = errors.New("cannot remove this item from cart")
	ErrCantBuyCartItem    = errors.New("cannot update the purchase")
)

var Guid = xid.New()

// func AddProductToCart(productID uint, userID uint) error {
// 	var product models.Product
// 	result := DB.First(&product, productID)
// 	if result.Error != nil {
// 		log.Println(result.Error)
// 		return ErrCantFindProduct
// 	}

// 	var user models.User
// 	result = DB.First(&user, userID)
// 	if result.Error != nil {
// 		log.Println(result.Error)
// 		return ErrUserIDIsNotValid
// 	}

// 	userCart := models.Product{
// 		ProductID: product.ProductID,
// 	}
// 	user.UserCart = append(user.UserCart, userCart)

// 	result = DB.Save(&user)
// 	if result.Error != nil {
// 		log.Println(result.Error)
// 		return ErrUserIDIsNotValid
// 	}

// 	return nil
// }

// func RemoveCartItem(productID string, userID uint) error {
// 	var user models.User
// 	result := DB.First(&user, userID)
// 	if result.Error != nil {
// 		log.Println(result.Error)
// 		return ErrUserIDIsNotValid
// 	}

// 	for i, item := range user.UserCart {
// 		if item.ProductID == productID {
// 			user.UserCart = append(user.UserCart[:i], user.UserCart[i+1:]...)
// 			break
// 		}
// 	}

// 	result = DB.Save(&user)
// 	if result.Error != nil {
// 		log.Println(result.Error)
// 		return ErrCantRemoveItemCart
// 	}

// 	return nil
// }

// func BuyItemsFromCart(userID uint) error {
// 	var user models.User
// 	if err := DB.Preload("UserCart").First(&user, userID).Error; err != nil {
// 		log.Println(err)
// 		return ErrUserIDIsNotValid
// 	}

// 	var totalPrice int
// 	for _, item := range user.UserCart {
// 		totalPrice += item.Price
// 	}

// 	// Create a new order
// 	order := models.Order{
// 		OrderID:       Guid.String(),
// 		OrderCart:     make([]models.Product, 0),
// 		OrderedAt:     time.Now(),
// 		Price:         totalPrice,
// 		PaymentMethod: models.Payment{COD: true},
// 	}

// 	// Update user with the new order
// 	if err := DB.Model(&user).Association("Orders").Append(&order); err != nil {
// 		log.Println(err)
// 		return ErrCantBuyCartItem
// 	}

// 	// Clear the user cart
// 	if err := DB.Model(&user).Association("UserCart").Clear(); err != nil {
// 		log.Println(err)
// 		return ErrCantBuyCartItem
// 	}

// 	return nil
// }

// func InstantBuyer(productID uint, userID uint) error {
// 	var productDetails models.Product
// 	var user models.User
// 	var order models.Order

// 	// Fetch product details
// 	if err := DB.First(&productDetails, productID).Error; err != nil {
// 		log.Println(err)
// 		return err
// 	}

// 	// Fetch user and preload Orders association
// 	if err := DB.Preload("Orders").First(&user, userID).Error; err != nil {
// 		log.Println(err)
// 		return ErrUserIDIsNotValid
// 	}

// 	// Create a new order
// 	order = models.Order{
// 		OrderID:       Guid.String(),
// 		OrderedAt:     time.Now(),
// 		OrderCart:     []models.Product{productDetails},
// 		Price:         productDetails.Price,
// 		PaymentMethod: models.Payment{COD: true},
// 	}

// 	// Update user with the new order
// 	if err := DB.Model(&user).Association("Orders").Append(&order); err != nil {
// 		log.Println(err)
// 		return err
// 	}

// 	// Update user order_list
// 	if err := DB.Model(&user).Association("Orders").Append(&productDetails); err != nil {
// 		log.Println(err)
// 		return err
// 	}

// 	return nil
// }
