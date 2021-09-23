const express = require("express");

const {
  getPaymentPage,
} = require("../../controller/donations/donation_contro");
let router = express.Router();

// the payment route for paystack
router.get("/", getPaymentPage);

module.exports = router;
