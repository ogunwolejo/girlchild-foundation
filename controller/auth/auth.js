// authentication file

const { validationResult } = require("express-validator");

// modules
const { create_admin, login_admin } = require("../../model/admin");
const { password_to_be_hash } = require("../../utils/hash_password");

// CONTROLLERS FOR AUTHENTICATION

exports.login_admin = async (req, res) => {
  const { login_email, login_password } = req.body;

  try {
    const _credentials = await login_admin(login_email, login_password);
    console.log(_credentials);
    req.session.isLogin = true;
    req.session.credentials = _credentials;
    return res.redirect("/admin/dashboard");
  } catch (err) {
    console.log("login err", err);

    req.flash("error", err);
    return res.redirect("/admin");
  }
};

/***
 * controller for creating admin profile
 */
exports.create_admin = async (req, res) => {
  const { signup_fullname, signup_email, signup_password, signup_c_password } =
    req.body;

  const _error = validationResult(req).array();
  console.log(_error);

  let hash_passord = password_to_be_hash(signup_password); // hashing password

  try {
    // creating an admin
    await create_admin(signup_fullname, signup_email, hash_passord);
    return res.redirect("/admin");
  } catch (err) {
    console.log(err);
    req.flash("error", err);
    return res.redirect("/admin/signup");
  }
};
