const AuthController = require('../Controllers/AuthController')

module.exports = (server, routes, prefix = '/auth') => {
  routes.post('/login', AuthController.store)
  server.use(prefix, routes)
}
