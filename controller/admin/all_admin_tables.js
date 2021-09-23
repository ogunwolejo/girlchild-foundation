// THE CONTROLLER FOR ALL ADMIN CASES THAT DEAL WITH TABLES

const { ceil } = require("lodash");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const { get_donee_data } = require("../../model/donee");

// THE CONTROLLER FOR THE ADMIN TO SEE THE NUMBER OF PROBLEMS PROFILE CASES AVAILABLE AND THOSE THAT ARE UNCOMPLETE AND HAVE NOT BEEN FUNDED

const ITEMS_PER_PAGE = 1; // the data_per_table for all donee and donations table

// donee table section
exports.getAdminDoneeDataTable = async (req, res) => {
  let page_num = req.query.page;

  if (page_num === undefined) {
    page_num = 1;
  }

  const data_to_skip_db = (page_num - 1) * ITEMS_PER_PAGE; // data to skip for pagination

  let donee_total = await prisma.donee.count();

  const total_pagination_page = ceil(donee_total / ITEMS_PER_PAGE);

  res.render("admin/admin-donee-tables.hbs", {
    layout: "admin/admin-main.hbs",
    adminFullname: req.session.credentials.fullname,
    data: await get_donee_data(ITEMS_PER_PAGE, data_to_skip_db),
    current_page: page_num,
    next_page: function () {
      if (parseInt(page_num) === total_pagination_page) {
        return null;
      }

      if (
        parseInt(page_num) < total_pagination_page ||
        parseInt(page_num) !== total_pagination_page
      ) {
        return parseInt(page_num) + 1;
      }

      if (parseInt(page_num) > total_pagination_page) {
        return page_num;
      }
    },

    is_there_next_page: function () {
      if (
        page_num + 1 < total_pagination_page &&
        page_num + 1 !== total_pagination_page
      ) {
        return true;
      }

      if (page_num + 1 === total_pagination_page) {
        return false;
      }
    },
    show_previous_page: function () {
      if (
        parseInt(page_num) - 1 > 1 &&
        parseInt(page_num) < total_pagination_page
      ) {
        return true;
      }

      if (parseInt(page_num) === total_pagination_page) {
        return true;
      }

      if (page_num === 1) {
        return false;
      }
    },
    show_last_page: page_num < total_pagination_page ? true : false,
    show_next_arrow: function () {
      if (parseInt(page_num) === total_pagination_page) {
        return false;
      }

      return true;
    },
    show_previous_arrow: function () {
      if (
        parseInt(page_num) - 1 > 1 &&
        parseInt(page_num) < total_pagination_page
      ) {
        return true;
      }

      if (parseInt(page_num) === total_pagination_page) {
        return true;
      }

      if (page_num === 1) {
        return false;
      }
    },

    previous_page: function () {
      if (page_num - 1 < 1 || page_num === 1) {
        return null;
      }

      return page_num - 1;
    },

    total_page: total_pagination_page,
  });
};

/** // THE CONTROLLER FOR THE ADMIN TO SEE THE NUMBER OF DONATIONS AND PEOPLE THAT HAVE BEEN DONATED TO, ON THE TABLE SECTION*/
exports.getAdminDonationDataTable = async (req, res) => {
  let page_num = req.query.page;

  if (page_num === undefined) {
    page_num = 1;
  }

  const data_to_skip_db = (page_num - 1) * ITEMS_PER_PAGE;

  let donee_total = await prisma.donations.count();

  const total_pagination_page = ceil(donee_total / ITEMS_PER_PAGE);

  res.render("admin/admin-donation-table.hbs", {
    layout: "admin/admin-main.hbs",
    adminFullname: req.session.credentials.fullname,
    //data: await Donations.showAlldata(ITEMS_PER_PAGE, data_to_skip_db),
    current_page: page_num,
    next_page: function () {
      if (parseInt(page_num) === total_pagination_page) {
        return null;
      }

      if (
        parseInt(page_num) < total_pagination_page ||
        parseInt(page_num) !== total_pagination_page
      ) {
        return parseInt(page_num) + 1;
      }

      if (parseInt(page_num) > total_pagination_page) {
        return page_num;
      }
    },

    is_there_next_page: function () {
      if (
        page_num + 1 < total_pagination_page &&
        page_num + 1 !== total_pagination_page
      ) {
        return true;
      }

      if (page_num + 1 === total_pagination_page) {
        return false;
      }
    },
    show_previous_page: function () {
      if (
        parseInt(page_num) - 1 > 1 &&
        parseInt(page_num) < total_pagination_page
      ) {
        return true;
      }

      if (parseInt(page_num) === total_pagination_page) {
        return true;
      }

      if (page_num === 1) {
        return false;
      }
    },
    show_last_page: page_num < total_pagination_page ? true : false,
    show_next_arrow: function () {
      if (parseInt(page_num) === total_pagination_page) {
        return false;
      }

      return true;
    },
    show_previous_arrow: function () {
      if (
        parseInt(page_num) - 1 > 1 &&
        parseInt(page_num) < total_pagination_page
      ) {
        return true;
      }

      if (parseInt(page_num) === total_pagination_page) {
        return true;
      }

      if (page_num === 1) {
        return false;
      }
    },

    previous_page: function () {
      if (page_num - 1 < 1 || page_num === 1) {
        return null;
      }

      return page_num - 1;
    },

    total_page: total_pagination_page,
  });
};

// SEARCHING USING THE TABLES FORM
exports.getAdminDoneeDataTableUsingForm = async (req, res) => {
  console.log(1);
  const { search_data } = req.body;
  console.log(search_donee_based_name);
  let page_num = req.query.page;

  if (page_num === undefined) {
    page_num = 1;
  }

  const data_to_skip_db = (page_num - 1) * ITEMS_PER_PAGE; // data to skip for pagination

  let donee_total = await prisma.donee.count();

  const total_pagination_page = ceil(donee_total / ITEMS_PER_PAGE);

  res.render("admin/admin-donee-tables.hbs", {
    layout: "admin/admin-main.hbs",
    adminFullname: req.session.credentials.fullname,
    data: await search_donee_based_name(
      search_data,
      ITEMS_PER_PAGE,
      data_to_skip_db
    ),
    current_page: page_num,
    next_page: function () {
      if (parseInt(page_num) === total_pagination_page) {
        return null;
      }

      if (
        parseInt(page_num) < total_pagination_page ||
        parseInt(page_num) !== total_pagination_page
      ) {
        return parseInt(page_num) + 1;
      }

      if (parseInt(page_num) > total_pagination_page) {
        return page_num;
      }
    },

    is_there_next_page: function () {
      if (
        page_num + 1 < total_pagination_page &&
        page_num + 1 !== total_pagination_page
      ) {
        return true;
      }

      if (page_num + 1 === total_pagination_page) {
        return false;
      }
    },
    show_previous_page: function () {
      if (
        parseInt(page_num) - 1 > 1 &&
        parseInt(page_num) < total_pagination_page
      ) {
        return true;
      }

      if (parseInt(page_num) === total_pagination_page) {
        return true;
      }

      if (page_num === 1) {
        return false;
      }
    },
    show_last_page: page_num < total_pagination_page ? true : false,
    show_next_arrow: function () {
      if (parseInt(page_num) === total_pagination_page) {
        return false;
      }

      return true;
    },
    show_previous_arrow: function () {
      if (
        parseInt(page_num) - 1 > 1 &&
        parseInt(page_num) < total_pagination_page
      ) {
        return true;
      }

      if (parseInt(page_num) === total_pagination_page) {
        return true;
      }

      if (page_num === 1) {
        return false;
      }
    },

    previous_page: function () {
      if (page_num - 1 < 1 || page_num === 1) {
        return null;
      }

      return page_num - 1;
    },

    total_page: total_pagination_page,
  });
};
