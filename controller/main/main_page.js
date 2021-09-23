//  THE MAIN PAGE CONTROLLER

const { get_recently_created_donee_profile } = require("../../model/donee");

exports.getHomePage = async (req, res) => {
  res.render("pages/index.hbs", {
    layout: "main.hbs",
    list: await get_recently_created_donee_profile(),
  });
};
