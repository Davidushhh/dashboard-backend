const nodemailer = require("nodemailer");

const { MAILER_HOST, MAILER_PORT, MAILER_USERNAME, MAILER_PASS } = process.env;

const mailer = nodemailer.createTransport({
  host: MAILER_HOST,
  port: MAILER_PORT,
  username: MAILER_USERNAME,
  from: MAILER_USERNAME,
  auth: {
    user: MAILER_USERNAME,
    pass: MAILER_PASS,
  },
});

module.exports = {
  mailer,
};

console.log("hi");
