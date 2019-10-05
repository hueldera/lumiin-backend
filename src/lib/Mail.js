import nodemailer from 'nodemailer'
import mailConfig from '../config/mail'
import exphbs from 'express-handlebars'
import nodemailerhbs from 'nodemailer-express-handlebars'
import mg from 'nodemailer-mailgun-transport'
import { resolve } from 'path'

class Mail {
  constructor () {
    const { host, port, secure, auth } = mailConfig
    // console.log('teste', mailConfig)
    this.transporter = nodemailer.createTransport(mg({
      auth: {
        api_key: mailConfig.api_key,
        domain: mailConfig.api_domain
      }
    }))

    this.configureTemplates()
  }

  configureTemplates () {
    const viewPath = resolve(__dirname, '..', 'app', 'views', 'emails')

    this.transporter.use('compile', nodemailerhbs({
      viewEngine: exphbs.create({
        layoutsDir: resolve(viewPath, 'layouts'),
        partialsDir: resolve(viewPath, 'partials'),
        defaultLayout: 'default',
        extname: '.hbs'
      }),
      viewPath,
      extName: '.hbs'
    }))
  }

  sendMail (message) {
    return this.transporter.sendMail({
      ...mailConfig.default,
      ...message
    })
  }
}

export default new Mail()
