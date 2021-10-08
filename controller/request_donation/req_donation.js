// SHOWING ALL CONTROLLER THAT ARE INVOLVED IN SHOWING PROBLEMS THAT ARE IN OF SOLVING

const {
  get_unquie_donee_profile,
  get_donee_data,
  get_recently_created_donee_profile,
} = require("../../model/donee");

const { ceil } = require("lodash");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const ITEMS_PER_PAGE = 1; // numbers of pictures per page

/**
 * THE CONTROLLER THAT SHOWS THE PROBLEMS THAT NEED DONATION FOR ADMINISTRATORS ONLY
 */
exports.getAdminDonationPage = async (req, res) => {
  res.render("admin/admin-donation.hbs", {
    layout: "admin/admin-main.hbs",
    adminFullname: req.session.credentials.fullname,
    isError: false,
    isInfo: false,
    errorMessage: false ? res.locals.message : null,
    successMessage: false ? res.locals.info : null,
    error: (await prisma.donee.count()) == 0 ? false : true,
    list: await get_recently_created_donee_profile(),
  });
};

/**
 * CONTROLLER SHOWING THE WHOLE DONATION LISTS WHOSE FUNDING HAVEN'T BEEN COMPLETED TO THE ADMIN
 */
exports.getAdminDonationsList = async (req, res) => {
  let page_num = req.query.page;

  const data_to_skip_db = (page_num - 1) * ITEMS_PER_PAGE; // data to skip for pagination

  res.render("admin/admin-all-donations.hbs", {
    layout: "admin/admin-main.hbs",
    adminFullname: req.session.credentials.fullname,
    list: await get_donee_data(10, 0),
  });
};

/**
 * CONTROLLER SHOWING THE WHOLE DONATION LIST FOR THOSE WHOSE FUNDING HAVE BEEN COMPLETED
 */

// SHOWING THE ONLY LIST OF THOSE THAT NEED DONATIONS
exports.showFullDonationPage = async (req, res) => {
  let page_num = req.query.page;
  const data_to_skip_db = (page_num - 1) * ITEMS_PER_PAGE; // data to skip for pagination

  res.render("pages/donations.hbs", {
    layout: "secondary.hbs",
    bread_crumb_title: "Donations".toUpperCase(),
    subtitle:
      "We believe that our efforts will contribute significantly to shaping the prospects of these young girls whilst improving their future opportunities through education.".toUpperCase(),
    data: await get_donee_data(ITEMS_PER_PAGE, data_to_skip_db),
  });
};

// SHOWING PAGE VISITORS AN INDIVIDUAL PERSON PROFILE THAT NEED DONATIONS
exports.showIndividualDonationPage = (req, res) => {
  const id = req.params.id;

  get_unquie_donee_profile(id)
    .then((_user) => {
      let user = {
        id: _user.id,
        fullname: _user.fullname,
        email: _user.email,
        mobileNumber: _user.mobileNumber,
        address: _user.address,
        content: _user.content,
        amount: new Intl.NumberFormat("en-NG", {
          style: "currency",
          currency: "NGN",
        }).format(_user.amount),
        category: _user.category,
        accountNumber: _user.accountNumber,
        bank: _user.bank,
        imageFile: JSON.parse(_user.imageFile.path),
      };
      res.render("pages/donee-donate.hbs", {
        layout: "secondary.hbs",
        bread_crumb_title: "Donation".toLocaleUpperCase(),
        user: user,
      });

      res.cookie("donneId", id);
    })
    .catch((e) => {
      console.log(e);
      return e;
    });
};
