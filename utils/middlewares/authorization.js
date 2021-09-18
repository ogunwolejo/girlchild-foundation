// AUTHORIZATION OF ADMIN

exports.authorization = (req, res, next) => {
  if (req.session.isLogin) {
    return next();
  }

  return res.redirect("/admin");
};
