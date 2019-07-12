const ProviderController = require('../Controllers/ProviderController')
const AvailableController = require('../Controllers/AvailableController')

module.exports = (server, routes, prefix = '/providers') => {
  routes.get('/', ProviderController.index)
  routes.get('/:id/available', AvailableController.index)
  server.use(prefix, routes)
}
