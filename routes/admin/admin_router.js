// ADMIN ROUTER MODULE
const express = require("express");

// modules
const {
  getAdminDonationPage,
} = require("../../controller/request_donation/req_donation");
const { authorization } = require("../../utils/middlewares/authorization");
const {
  validate_form_data_for_admin_login,
  validate_form_data_for_admin_signup,
} = require("../../utils/middlewares/validators");

const {
  getAdminDashboardPage,
  getAdminLoginPage,
  getAdminSignupPage,
} = require("../../controller/admin/admin");

const { create_admin, login_admin } = require("../../controller/auth/auth");

// intialization
const router = express.Router();

// ALL GET REQUEST OPERATIONS
router.get("/", getAdminLoginPage);
router.get("/dashboard", authorization, getAdminDashboardPage);
router.get("/signup", getAdminSignupPage);
router.get("/donation", getAdminDonationPage);
//router.get("/donee-tables", authorization, getAdminDoneeDataTable);
//router.get("/donation-tables", authorization, getAdminDonationDataTable);
//router.get("/list", authorization, getDonationsList);

// ALL POST REQUEST OPERATIONS
router.post("/signup", create_admin);
router.post("/login", login_admin);

module.exports = router;
