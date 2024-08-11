const nodeMailer = require("nodemailer");

const sendEmail = async (options) => {
  const transporter = nodeMailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    secure: false, // Use SSL
    auth: {
      user: "39afa8e81e9190",
      pass: "d2d12f57116e8f",
    },
    authMethod: "LOGIN", // Specify the authentication method
  });

  const mailOptions = {
    from: "admin@****",
    to: options.to,
    subject: options.subject,
    html: options.message,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
