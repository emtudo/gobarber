require('dotenv/config')
const express = require('express')
require('express-async-errors')
const routes = require('./app/Http/Routes')
const Sentry = require('@sentry/node')
const configCentry = require('./config/sentry')
require('./database')
const Youch = require('youch')

class App {
  constructor() {
    this.server = express()
    Sentry.init(configCentry)

    this.middlewares()
    this.routes()
    this.exceptionHandler()
  }

  middlewares() {
    this.server.use(Sentry.Handlers.requestHandler())

    this.server.use(express.json())

    // All controllers should live here
    /*
    this.server.get('/debug-sentry', function mainHandler(req, res) {
      throw new Error('My first Sentry error!')
    })
    */
  }

  routes() {
    routes(this.server)
    // this.server.use(routes)
    this.server.use(Sentry.Handlers.errorHandler())
  }

  exceptionHandler() {
    this.server.use(async (error, request, response, next) => {
      if (process.env.NODE_ENV !== 'development') {
        return response.status(500).json({ error: 'internal server error' })
      }
      const errors = await new Youch(error, request).toJSON()

      return response.status(500).json(errors)
    })
  }
}

module.exports = new App().server
