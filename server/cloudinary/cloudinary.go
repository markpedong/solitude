package cloudinary

import (
	"os"

	"github.com/cloudinary/cloudinary-go/v2"
)

var CloudinaryService *cloudinary.Cloudinary

func Init() {
	var err error
	CloudinaryService, err = cloudinary.NewFromParams(os.Getenv("CLOUDINARY_CLOUD_NAME"), os.Getenv("CLOUDINARY_API_KEY"), os.Getenv("CLOUDINARY_API_SECRET"))
	if err != nil {
		panic(err)
	}
}
