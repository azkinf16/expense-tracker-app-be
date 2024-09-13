const nodemailer = require("nodemailer")

const emailManager = async (to, text, subject) => {
  var transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "8ea1b4049f6377",
      pass: "e87951bc70e8df",
    },
  });

  await transport.sendMail({
    to: to,
    from: "info@expensetracker.com",
    text: text,
    subject: subject,
  });
};

module.exports = emailManager;
