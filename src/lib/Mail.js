const nodemailer = require('nodemailer')
const expressHandlebars = require('express-handlebars')
const nodemailerHandlebars = require('nodemailer-express-handlebars')
const { resolve } = require('path')

const {
  host,
  port,
  secure,
  auth,
  default: defaultConfig,
} = require('../config/mail')

class Mail {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host,
      port,
      secure,
      auth: auth.user ? auth : null,
    })

    this.configureTemplates()
  }

  configureTemplates() {
    const viewPath = resolve(__dirname, '..', 'app', 'views', 'emails')

    this.transporter.use(
      'compile',
      nodemailerHandlebars({
        viewEngine: expressHandlebars.create({
          layoutsDir: resolve(viewPath, 'layouts'),
          partialsDir: resolve(viewPath, 'partials'),
          defaultLayout: 'default',
          extname: '.hbs', // default: .handlebars
        }),
        viewPath,
        extName: '.hbs',
      }),
    )
  }

  sendMail(message) {
    return this.transporter.sendMail({
      ...defaultConfig,
      ...message,
    })
  }
}

module.exports = new Mail()
