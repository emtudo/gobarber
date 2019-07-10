const UserController = require('../Controllers/UserController')
const AllowChangePasswordMiddleware = require('../Middlewares/AllowChangePasswordMiddleware')

module.exports = (server, routes, prefix = '/users') => {
  routes.get('/', UserController.index)
  routes.put('/:id', AllowChangePasswordMiddleware, UserController.update)
  server.use(prefix, routes)
}
