const nodemailer = require("nodemailer");

exports.sendEmail = (
  destinationEmail,
  emailSubject,
  emailText,
  emailOutput
) => {
  const transporter = nodemailer.createTransport({
    service: "hotmail",
    secure: false,
    auth: {
      user: process.env.EMAILADDRESS,
      pass: process.env.EMAILPASSWORD,
      type: "LOGIN",
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const mail = {
    from: `ddfoundation ${process.env.EMAILADDRESS}`,
    to: destinationEmail,
    subject: emailSubject,
    text: emailText,
    html: emailOutput,
  };

  transporter.sendMail(mail, (error, info) => {
    if (error) {
      console.log(error);
      return;
    }

    console.log(info.response);
  });
};
