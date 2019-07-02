const { Router } = require('express')
const UserController = require('./app/Http/Controllers/UserController')
const ProfileController = require('./app/Http/Controllers/ProfileController')
const AuthController = require('./app/Http/Controllers/AuthController')
const AuthMiddleware = require('./app/Http/Middlewares/AuthMiddleware')
const AllowChangePasswordMiddleware = require('./app/Http/Middlewares/AllowChangePasswordMiddleware')

const routes = new Router()

routes.post('/auth/login', AuthController.store)

routes.post('/users', UserController.store)

routes.use(AuthMiddleware)
routes.put('/users/:id', AllowChangePasswordMiddleware, UserController.update)
routes.put('/profile', AllowChangePasswordMiddleware, ProfileController.update)

module.exports = routes
