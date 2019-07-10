const express = require('express')
const { resolve } = require('path')
const { Router } = express
const AuthMiddleware = require('../Middlewares/AuthMiddleware')

const appointments = require('./appointments')
const auth = require('./auth')
const files = require('./files')
const profile = require('./profile')
const users = require('./users')
const providers = require('./providers')
const schedules = require('./schedules')

module.exports = server => {
  auth(server, new Router())

  const pathAvatar = resolve(
    __dirname,
    '..',
    '..',
    '..',
    '..',
    'tmp',
    'uploads',
  )

  server.use('/avatar/', express.static(resolve(pathAvatar)))

  server.use(AuthMiddleware, (request, response, next) => {
    appointments(server, new Router())
    files(server, new Router())
    profile(server, new Router())
    users(server, new Router())
    providers(server, new Router())
    schedules(server, new Router())

    next()
  })
}
