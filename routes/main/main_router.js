const express = require("express");

const { getHomePage } = require("../../controller/main/main_page");
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

module.exports = router;
