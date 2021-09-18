// Validators of data inputed
const { check } = require("express-validator");

exports.validate_form_data_for_admin_login = (req, res, next) => {
  console.log(req.body);
};

exports.validate_form_data_for_admin_signup = (req, res, next) => {};
