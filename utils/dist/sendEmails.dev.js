"use strict";

var nodeMailer = require("nodemailer");

var sendEmail = function sendEmail(options) {
  var transporter, mailOptions;
  return regeneratorRuntime.async(function sendEmail$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          transporter = nodeMailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            secure: false,
            // Use SSL
            auth: {
              user: "39afa8e81e9190",
              pass: "d2d12f57116e8f"
            },
            authMethod: "LOGIN" // Specify the authentication method

          });
          mailOptions = {
            from: "admin@****",
            to: options.to,
            subject: options.subject,
            html: options.message
          };
          _context.next = 4;
          return regeneratorRuntime.awrap(transporter.sendMail(mailOptions));

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
};

module.exports = sendEmail;