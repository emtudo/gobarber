module.exports = {
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  secure: process.env.MAIL_SECURE,
  auth: {
    user: process.env.MAIL_AUTH_USER,
    pass: process.env.MAIL_AUTH_PASS,
  },
  default: {
    from: process.env.MAIL_DEFAULT_FROM,
  },
}
