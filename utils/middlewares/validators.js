// Validators of data inputed
const { check } = require("express-validator");

exports.validate_form_data_for_admin_login = (req, res, next) => {
  console.log(req.body);
  const { login_email, login_password } = req.body;

  // using the express validators to validate the body
  check(login_email)
    .isEmail()
    .normalizeEmail()
    .withMessage("These is not a valid email!!".toUpperCase());

  check(login_password)
    .isLength({
      min: 8,
    })
    .withMessage("Password must contain atleast 8 characeter".toUpperCase());

  next();
};

exports.validate_form_data_for_admin_signup = (req, res, next) => {};
