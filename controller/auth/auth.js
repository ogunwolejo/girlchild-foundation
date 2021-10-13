// authentication file
const { validationResult } = require("express-validator");
const { create_token } = require("../../utils/emailToken");

// modules
const { create_admin, login_admin } = require("../../model/admin");
const { password_to_be_hash } = require("../../utils/hash_password");
const { sendEmail } = require("../../utils/nodemailer/sendEmail");

// CONTROLLERS FOR AUTHENTICATION

exports.login_admin = async (req, res) => {
  const { login_email, login_password } = req.body;

  try {
    const _credentials = await login_admin(login_email, login_password);
    req.session.isLogin = true;
    req.session.credentials = _credentials;
    return res.redirect("/admin/donation");
  } catch (err) {
    //console.log("login err", err);
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
    let createdAdmin = await create_admin(
      signup_fullname,
      signup_email,
      hash_passord
    );

    // create a token that will be sent to the email
    let token = create_token(createdAdmin.id);

    /** email content for sending link to verify email */
    const emailContent = `
  <p>This link is ensure the security of the user with
  with this email.<br>
  Ensure to click on the link or the button below.
  </p>
  
  <div class="col-12">
    <div class="row">
     <a href="http://localhost:${process.env.PORT}/admin/activate?q=${token}">http://localhost:${process.env.PORT}/admin/activate?q=${token}</a>
    </div>

    <div style=margin-top:50px">
      <button style="background-color:#1A237E; width:200px; height:20px; border-style:none; border-width:0; color:white; " target="_self">ACTIVATE EMAIL</button>
    </div>
  </div>
`;

    // send an email to confirm and verify the
    sendEmail(signup_email, "Activate account", null, emailContent);

    req.flash("info", "Confirm account on your email");
    return res.redirect("/admin");
  } catch (err) {
    req.flash("error", err);
    return res.redirect("/admin/signup");
  }
};
