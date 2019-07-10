const { Router } = require('express')
const AuthMiddleware = require('../Middlewares/AuthMiddleware')
const multer = require('multer')
const multerConfig = require('../../../config/multer')
const upload = multer(multerConfig)

const auth = require('./auth')
const files = require('./files')
const profile = require('./profile')
const users = require('./users')
const providers = require('./providers')

module.exports = server => {
  auth(server, new Router())

  server.use(AuthMiddleware, function(request, response, next) {
    files(server, new Router())
    profile(server, new Router())
    users(server, new Router())
    providers(server, new Router())

    next()
  })
}
