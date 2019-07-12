const NotificationController = require('../Controllers/NotificationController')

const ProviderMiddleware = require('../Middlewares/ProviderMiddleware')

module.exports = (server, routes, prefix = '/notifications') => {
  routes.get('/', ProviderMiddleware, NotificationController.index)
  routes.put('/:id', ProviderMiddleware, NotificationController.update)

  server.use(prefix, routes)
}
