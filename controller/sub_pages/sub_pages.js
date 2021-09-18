// THE PAGES IN THE ABOUT SECTION

exports.getOurStoryPage = (req, res) => {
  res.render("pages/about-sub-pages/our-story-page.hbs", {
    layout: "secondary.hbs",
    bread_crumb_title: "our story".toLocaleUpperCase(),
  });
};

exports.getLeadershipPage = (req, res) => {
  res.render("pages/about-sub-pages/leadership-page.hbs", {
    layout: "secondary.hbs",
    bread_crumb_title: "leadership".toLocaleUpperCase(),
  });
};
