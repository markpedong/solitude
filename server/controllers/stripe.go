package controllers

import (
	"fmt"
	"net/http"
	"solitude/helpers"

	"github.com/gin-gonic/gin"
	"github.com/stripe/stripe-go/v76"
	"github.com/stripe/stripe-go/v76/paymentintent"
)

func CreatePaymentIntent(ctx *gin.Context) {
	var body struct {
		TotalAmount int `json:"total_amount"`
	}
	if err := helpers.BindValidateJSON(ctx, &body); err != nil {
		return
	}
	params := &stripe.PaymentIntentParams{
		Amount:   stripe.Int64(int64(body.TotalAmount) * 100),
		Currency: stripe.String(string(stripe.CurrencyPHP)),
		AutomaticPaymentMethods: &stripe.PaymentIntentAutomaticPaymentMethodsParams{
			Enabled: stripe.Bool(true),
		},
	}
	pi, err := paymentintent.New(params)
	if err != nil {
		if stripeErr, ok := err.(*stripe.Error); ok {
			fmt.Printf("A stripe error occured: %v\n", stripeErr.Error())
			helpers.ErrJSONResponse(ctx, http.StatusBadRequest, stripeErr.Error())
			return
		} else {
			fmt.Printf("Other error occured: %v\n", err.Error())
			helpers.ErrJSONResponse(ctx, http.StatusBadRequest, "Other error occured: %v\n")
			return
		}
	}

	helpers.JSONResponse(ctx, "", helpers.DataHelper(pi.ClientSecret))
}
