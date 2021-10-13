// THE CONTROLLER FOR ALL ADMIN CASES THAT DEAL WITH TABLES

const { ceil } = require("lodash");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const { get_donee_data } = require("../../model/donee");

// THE CONTROLLER FOR THE ADMIN TO SEE THE NUMBER OF PROBLEMS PROFILE CASES AVAILABLE AND THOSE THAT ARE UNCOMPLETE AND HAVE NOT BEEN FUNDED

const ITEMS_PER_PAGE = 1; // the data_per_table for all donee and donations table

// donee table section
exports.getAdminDoneeDataTable = async (req, res) => {
  let donee_total = await prisma.donee.count();

  res.render("admin/admin-donee-tables.hbs", {
    layout: "admin/admin-main.hbs",
    adminFullname: req.session.credentials.fullname,
    data: null, //await get_donee_data(ITEMS_PER_PAGE, data_to_skip_db),
  });
};

/** // THE CONTROLLER FOR THE ADMIN TO SEE THE NUMBER OF DONATIONS AND PEOPLE THAT HAVE BEEN DONATED TO, ON THE TABLE SECTION*/
exports.getAdminDonationDataTable = async (req, res) => {
  let donee_total = await prisma.donations.count();
  res.render("admin/admin-donation-table.hbs", {
    layout: "admin/admin-main.hbs",
    adminFullname: req.session.credentials.fullname,
    data: null, //await Donations.showAlldata(ITEMS_PER_PAGE, data_to_skip_db),
  });
};

// SEARCHING USING THE TABLES FORM
exports.getAdminDoneeDataTableUsingForm = async (req, res) => {
  res.render("admin/admin-donee-tables.hbs", {
    layout: "admin/admin-main.hbs",
    adminFullname: req.session.credentials.fullname,
    data: null, //await search_donee_based_name(),
  });
};
