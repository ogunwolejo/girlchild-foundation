const { activateEmail } = require("../../model/admin");
const { decode_token } = require("../../utils/emailToken");

exports.emailAuth = async (req, res) => {
  // activate the email
  try {
    // decoding token
    const decodedToken = await decode_token(req.query.q);

    const verifiedEmail = await activateEmail(decodedToken.id);

    if (verifiedEmail === 1) {
      //console.log("verified email is successful");
      return res.redirect("/admin"); // the login page
    }
  } catch (error) {
    console.log(error);
    return error;
  }
};
