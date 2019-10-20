const dotenv = require('dotenv')

console.log('Env: ' + (process.env.NODE_ENV === 'test' ? '.env.test' : '.env'))

dotenv.config({
  path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env'
})
