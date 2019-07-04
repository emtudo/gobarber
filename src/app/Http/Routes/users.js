const UserController = require('../Controllers/UserController')
const AuthMiddleware = require('../Middlewares/AuthMiddleware')
const AllowChangePasswordMiddleware = require('../Middlewares/AllowChangePasswordMiddleware')

module.exports = (server, routes, prefix = '/users') => {
  routes.post('/', UserController.store)

  routes.put(
    '/:id',
    AuthMiddleware,
    AllowChangePasswordMiddleware,
    UserController.update,
  )
  server.use(prefix, routes)
}
