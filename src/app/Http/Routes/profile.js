const ProfileController = require('../Controllers/ProfileController')

const AuthMiddleware = require('../Middlewares/AuthMiddleware')
const AllowChangePasswordMiddleware = require('../Middlewares/AllowChangePasswordMiddleware')

module.exports = (server, routes, prefix = '/profile') => {
  routes.put(
    '',
    AuthMiddleware,
    AllowChangePasswordMiddleware,
    ProfileController.update,
  )
  server.use(prefix, routes)
}
