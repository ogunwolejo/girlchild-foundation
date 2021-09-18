var stripe = Stripe("pk_test_7wxLrgnbodcvidaM4wKAXvhJ00kNWPH9Zf", {
    stripeAccount: "acct_24BFMpJ1svR5A89k"
    //locale: default
});

// elements
var element = stripe.elements();

var styles = {
  base: {
    iconColor: "#c4f0ff",
    color: "#fff",
    fontWeight: "500",
    fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
    fontSize: "16px",
    fontSmoothing: "antialiased",
    ":-webkit-autofill": {
      color: "#fce883",
    },
    "::placeholder": {
      color: "#87BBFD",
    },
  },

  invalid: {
    iconColor: "#FFC7EE",
    color: "#FFC7EE",
  },
};

var cardElement = element.create("card", {
  disabled: false,
  classes: {
    base: "StripeElement",
  },
  style: styles.base,
});

cardElement.mount("#donation-card");
