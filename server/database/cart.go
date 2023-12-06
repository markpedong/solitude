package database

import (
	"errors"
	"log"
	"solitude/models"
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

func RemoveCartItem()  {}
func BuyItemFromCart() {}
func InstartBuyer()    {}
