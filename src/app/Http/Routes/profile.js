const ProfileController = require('../Controllers/ProfileController')

const AllowChangePasswordMiddleware = require('../Middlewares/AllowChangePasswordMiddleware')

module.exports = (server, routes, prefix = '/profile') => {
  routes.put('', AllowChangePasswordMiddleware, ProfileController.update)
  server.use(prefix, routes)
}
