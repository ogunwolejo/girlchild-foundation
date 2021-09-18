const { create_problem_need_donation } = require("../../model/admin");

/**
 * THE CONTROLLER SHOWING THE LAYOUT PRESENTATION OF THE LOGIN PAGE ONLY
 */
exports.getAdminLoginPage = (req, res) => {
  res.render("admin/admin-login.hbs", {
    layout: "admin/admin-auth.hbs",
    isError: false,
    errorMessage: false ? res.locals.message : undefined,
  });
  //req.session.message = undefined;
};

/**
 * THE CONTROLLER SHOWING THE LAYOUT PRESENTATION OF THE SIGNUP PAGE ONLY
 */
exports.getAdminSignupPage = (req, res) => {
  res.render("admin/admin-signup.hbs", {
    layout: "admin/admin-auth.hbs",
    isError: false,
    errorMessage: false ? res.locals.message : null,
  });
  //req.session.message = undefined;
};

/**
 * THE ADMIN DASHBOARD CONTROLLER
 */
exports.getAdminDashboardPage = (req, res) => {
  res.render("admin/admin-index", {
    layout: "admin/admin-main.hbs",
  });
};

/**
 * THE CONTROLLER THAT MAKES THE ADMINSTRATOR TO CREATE AND POST THE PROBLEMS AND PEOPLE THAT ARE IN NEED OF DONATION
 */
exports.uploadNewDoneeData = (req, res) => {
  const body = req.body;
  var file = req.file;
  var filePath = `/${file.path.split("\\")[8]}/${file.path.split("\\")[9]}`;

  create_problem_need_donation(
    body.dFullname,
    body.dTelPhone,
    parseFloat(body.dAmountNeeded),
    parseInt(body["d-category"]),
    body.dBankNum,
    body.dBankName,
    body.dAddress,
    filePath,
    body["d-content"],
    body.dEmail
  )
    .then((result) => {
      console.log(result);
      req.session.message = { info: result };
      return res.redirect("/admin/donation");
    })
    .catch((err) => {
      req.session.message = { error: err };
      return res.redirect("/admin/donation");
    });
};
