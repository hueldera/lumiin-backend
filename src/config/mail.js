require('dotenv/config')

export default {
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  secure: process.env.MAIL_SECURE,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS
  },
  default: {
    from: 'Lumiin <noreply@lumiin.app>'
  },
  api_key: process.env.MAIL_API,
  api_url: process.env.MAIL_URL,
  api_domain: process.env.MAIL_DOMAIN
}
