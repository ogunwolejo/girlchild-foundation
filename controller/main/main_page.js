//  THE MAIN PAGE CONTROLLER

exports.getHomePage = (req, res) => {
  res.render("pages/index.hbs", {
    layout: "main.hbs",
  });
};
