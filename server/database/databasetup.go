package database

import (
	"context"
	"log"
	"os"
	"solitude/models"
	"time"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
	"gorm.io/gorm/schema"
)

var (
	DB *gorm.DB
)

func DBSet() {
	var err error

	_, cancel := context.WithTimeout(context.Background(), time.Second*10)
	defer cancel()

	DB, err = gorm.Open(postgres.Open(os.Getenv("DB_DSN")),
		&gorm.Config{
			NamingStrategy: schema.NamingStrategy{SingularTable: true},
		})

	if err != nil {
		log.Fatal("failed to Connect to a Database")
		return
	}

	err = DB.AutoMigrate(
		&models.Product{},
		models.DeliveryInformation{},
		&models.ProductVariations{},
		&models.VariationValue{},
		&models.Carts{},
		&models.OrderGroup{},
		&models.Orders{},
		&models.ProductReviews{},
		&models.SellerReviews{},
		&models.NewsLetter{},
	)
	if err != nil {
		log.Fatal(err.Error())
		return
	}

	err = DB.AutoMigrate(&models.User{}, &models.Seller{})
	if err != nil {
		log.Fatal(err.Error())
		return
	}
}
