// ADMIN ROUTER MODULE
const express = require("express");
const multer = require("multer");

// modules

// THE REQUEST_DONATION MODULES
const {
  getAdminDonationPage,
  getAdminDonationsList,
} = require("../../controller/request_donation/req_donation");

// THE ADMIN MODULES
const {
  getAdminDonationDataTable,
  getAdminDoneeDataTable,
  getAdminDoneeDataTableUsingForm,
} = require("../../controller/admin/all_admin_tables");

const {
  getAdminDashboardPage,
  getAdminLoginPage,
  getAdminSignupPage,
  uploadNewDoneeData,
} = require("../../controller/admin/admin");

// THE MODULES FROM THE UTILS
const { authorization } = require("../../utils/middlewares/authorization");
const {
  validate_form_data_for_admin_login,
  validate_form_data_for_admin_signup,
} = require("../../utils/middlewares/validators");

// THE AUTH MODULE
const { create_admin, login_admin } = require("../../controller/auth/auth");

// THE MULTER MODULES
const { multer_storage } = require("../../config/multer");

var upload = multer(multer_storage);

// intialization
const router = express.Router();

// ALL GET REQUEST OPERATIONS
router.get("/", getAdminLoginPage);
router.get("/dashboard", authorization, getAdminDashboardPage);
router.get("/signup", getAdminSignupPage);
router.get("/donation", getAdminDonationPage);
router.get("/donee-tables", getAdminDoneeDataTable);
router.get("/donation-tables", getAdminDonationDataTable);
router.get("/list", getAdminDonationsList);

// ALL POST REQUEST OPERATIONS
router.post("/signup", create_admin);
router.post("/login", login_admin);

// FOR UPLOADING PROBLEM PROFILE PIC
router.post("/create-donee-data", upload.single("d-image"), uploadNewDoneeData);

// DELETING A PROBLEM DATA
//router.post("/delete-donee-data", delete_donee_profile);

module.exports = router;
