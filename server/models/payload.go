package models

type JSONAddProduct struct {
	ProductName string      `json:"product_name"`
	Description string      `json:"description"`
	Price       float64     `json:"price"`
	Stock       int         `json:"stock"`
	Categories  []string    `json:"categories"`
	Variations  []Variation `json:"variations"`
	SellerID    string      `json:"seller_id"`
	Image       []string    `json:"image"`
}

type Variation struct {
	Label string   `json:"label"`
	Value []string `json:"value"`
}

type ReviewItem struct {
	Rating      float64  `json:"rating" validate:"required"`
	Description string   `json:"description"`
	ProductID   string   `json:"product_id" validate:"required"`
	Images      []string `json:"images"`
}
