import './bootstrap'
import express from 'express'
import 'express-async-errors'
import routes from './routes'
import path from 'path'
import './database'
import * as Sentry from '@sentry/node'
import sentryConfig from './config/sentry'
import Youch from 'youch'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import cors from 'cors'

class App {
  constructor () {
    this.server = express()

    Sentry.init(sentryConfig)

    this.middlewares()
    this.routes()
    this.exceptionHandler()
  }

  middlewares () {
    this.server.all('*', function (req, res, next) {
      res.header('Access-Control-Allow-Origin', '*')
      next()
    })

    this.server.use(Sentry.Handlers.requestHandler())
    this.server.use(helmet())
    this.server.use(cors())
    this.server.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }))
    this.server.use(cors({ origin: true, credentials: true }))
    this.server.use(express.json())
    this.server.use('/files', express.static(path.resolve(__dirname, '..', 'tmp', 'uploads')))
  }

  routes () {
    this.server.use(routes)
    this.server.use(Sentry.Handlers.errorHandler())
  }

  exceptionHandler () {
    this.server.use(async (err, req, res, next) => {
      if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test' ) {
        const errors = await new Youch(err, req).toJSON()
        console.log(errors)
        return res.status(500).json(errors)
      }
      return res.status(500).json({ error: 'Internal server error' })
    })
  }
}

export default new App().server
