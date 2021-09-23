const express = require("express");

// THE
const {
  showIndividualDonationPage,
  showFullDonationPage,
} = require("../../controller/request_donation/req_donation");

// THE MAIN PAGE CONTROLLER
const { getHomePage } = require("../../controller/main/main_page");

// THE SUBPAGE CONTROLLER
const {
  getOurStoryPage,
  getLeadershipPage,
} = require("../../controller/sub_pages/sub_pages");

// intialization

const router = express.Router();

// GET OPERATIONS FOR MAIN PAGE
router.get("/", getHomePage);

// GET OPERATIONS FOR THE SUB-PAGES
router.get("/our-story", getOurStoryPage);
router.get("/leadership", getLeadershipPage);

// GET OPERATIONS FOR SHOWING ALL THE ISSUES TO THE PAGE VISITORS
router.get("/donations", showFullDonationPage);
router.get("/donation/:id", showIndividualDonationPage);

module.exports = router;
