//const { parse } = require("dotenv");
const {
  get_recently_created_donee_profile,
  create_problem_need_donation,
  delete_problem_need_donation,
  search_donee_based_name,
} = require("../../model/donee");

/**
 * THE CONTROLLER SHOWING THE LAYOUT PRESENTATION OF THE LOGIN PAGE ONLY
 */
exports.getAdminLoginPage = (req, res) => {
  const is_error = req.flash("error") == null ? false : true;

  console.log(2);
  res.render("admin/admin-login.hbs", {
    layout: "admin/admin-auth.hbs",
    isError: is_error,
    errorMessage: req.flash("error"),
  });
};

/**
 * THE CONTROLLER SHOWING THE LAYOUT PRESENTATION OF THE SIGNUP PAGE ONLY
 */
exports.getAdminSignupPage = (req, res) => {
  const is_error = req.flash("error") == null ? false : true;

  res.render("admin/admin-signup.hbs", {
    layout: "admin/admin-auth.hbs",
    isError: is_error,
    errorMessage: req.flash("error"),
  });
  //req.session.message = undefined;
};

/**
 * THE ADMIN DASHBOARD CONTROLLER
 */
exports.getAdminDashboardPage = async (req, res) => {
  res.render("admin/admin-index", {
    layout: "admin/admin-main.hbs",
    adminFullname: req.session.credentials.fullname,
    //donationsDetails: await get_recently_created_donee_profile(), // the recent ref number for people that have donated on paystack
  });
};

/**
 * THE CONTROLLER THAT MAKES THE ADMINSTRATOR TO CREATE AND POST THE PROBLEMS AND PEOPLE THAT ARE IN NEED OF DONATION
 */
exports.uploadNewDoneeData = (req, res) => {
  const body = req.body;
  var file = req.file;

  var filePath = `/${file.path.split("\\")[8]}`;

  create_problem_need_donation(
    body.dFullname,
    body.dEmail,
    body.dTelPhone,
    body.dAddress,
    body["d-content"],
    parseFloat(body.dAmountNeeded),
    body.dBankNum,
    body.dBankName,
    filePath
  )
    .then((result) => {
      console.log(result);
      //req.session.message = { info: result };
      return res.redirect("/admin/donation");
    })
    .catch((err) => {
      //req.session.message = { error: err };
      return res.redirect("/admin/donation");
    });
};

/**
 * CONTROLLER FOR THE ADMIN TO BE ABLE TO DELETE A PARTICULAR PROBLEM PROFILE
 
exports.search_donee_profile = async (req, res) => {
  console.log(req);
};*/
