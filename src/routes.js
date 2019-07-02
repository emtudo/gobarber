const { Router } = require('express')
const UserController = require('./app/Http/Controllers/UserController')
const AuthController = require('./app/Http/Controllers/AuthController')

const routes = new Router()

routes.post('/auth/login', AuthController.store)

routes.post('/users', UserController.store)

module.exports = routes
