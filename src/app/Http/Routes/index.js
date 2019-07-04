const { Router } = require('express')

const auth = require('./auth')
const profile = require('./profile')
const users = require('./users')

module.exports = server => {
  auth(server, new Router())
  profile(server, new Router())
  users(server, new Router())
}
