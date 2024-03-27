package controllers

import (
	"log"
	"net/http"
	"os"
	"solitude/helpers"

	"github.com/gin-gonic/gin"
	"github.com/stripe/stripe-go/paymentintent"
	"github.com/stripe/stripe-go/v72"
)

func StripeConfig(ctx *gin.Context) {
	key := os.Getenv("STRIPE_PUBLISHABLE_KEY")
	if key == "" {
		helpers.ErrJSONResponse(ctx, http.StatusNotFound, "check the key")
		return
	}

	helpers.JSONResponse(ctx, "", helpers.DataHelper(key))
}

func StripeHandlePayment(ctx *gin.Context) {
	stripeKey := os.Getenv("STRIPE_SECRET_KEY")

	params := &stripe.PaymentIntentParams{
		Amount:   stripe.Int64(int64(data.Price)),
		Currency: stripe.String(string(stripe.CurrencyUSD)),
		AutomaticPaymentMethods: &stripe.PaymentIntentAutomaticPaymentMethodsParams{
			Enabled: stripe.Bool(true),
		},
	}

	pi, err := paymentintent.New(params)
	log.Printf("pi.New: %v", pi.ClientSecret)

	if err != nil {
		helpers.ErrJSONResponse(ctx, http.StatusInternalServerError, err.Error())
		log.Printf("pi.New: %v", err)
		return
	}

	resp := map[string]interface{}{
		"clientSecret": pi.ClientSecret,
	}

	helpers.JSONResponse(ctx, "", helpers.DataHelper(resp))

}
