//  THE MAIN PAGE CONTROLLER

const { get_recently_created_donee_profile } = require("../../model/donee");

exports.getHomePage = async (req, res) => {
  const _list = await get_recently_created_donee_profile();

  if (_list.length > 0) {
    return res.render("pages/index.hbs", {
      layout: "main.hbs",
      list: _list,
      isList: true,
    });   
  }
  
  return res.render("pages/index.hbs", {
    layout: "main.hbs",
    list: null,
    isList: false,
  });
};
