// SHOWING ALL CONTROLLER THAT ARE INVOLVED IN SHOWING PROBLEMS THAT ARE IN OF SOLVING

/**
 * THE CONTROLLER THAT SHOWS THE PROBLEMS THAT NEED DONATION FOR ADMINISTRATORS ONLY
 */
exports.getAdminDonationPage = (req, res) => {
  res.render("admin/admin-donation.hbs", {
    layout: "admin/admin-main.hbs",
    adminFullname: req.session.credentials.fullname,
    isError: false,
    isInfo: false,
    errorMessage: false ? res.locals.message : null,
    successMessage: false ? res.locals.info : null,
    //list: await Donees.getDoneeData(),
  });

  //req.session.message = null;
};
