const express = require('express')
const routes = require('./app/Http/Routes')

require('./database')

class App {
  constructor() {
    this.server = express()

    this.middlewares()
    this.routes()
  }

  middlewares() {
    this.server.use(express.json())
  }

  routes() {
    routes(this.server)
    // this.server.use(routes)
  }
}

module.exports = new App().server
