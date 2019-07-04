const AuthController = require('../Controllers/AuthController')
const UserController = require('../Controllers/UserController')

module.exports = (server, routes, prefix = '/auth') => {
  routes.post('/login', AuthController.store)
  routes.post('/register', UserController.store)
  server.use(prefix, routes)
}
