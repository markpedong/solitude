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
		log.Fatal("Failed to Connect to a Database")
		return
	}

	DB.AutoMigrate(
		&models.Address{},
		&models.Order{},
		&models.Payment{},
		&models.Blogs{},
		&models.Product{},
	)
	DB.AutoMigrate(&models.User{})
	if err != nil {
		log.Fatal("There seems to be a problem when migrating")
		return
	}
}
