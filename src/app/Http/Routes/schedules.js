const ScheduleController = require('../Controllers/ScheduleController')

const ProviderMiddleware = require('../Middlewares/ProviderMiddleware')

module.exports = (server, routes, prefix = '/schedules') => {
  routes.get('/', ProviderMiddleware, ScheduleController.index)

  server.use(prefix, routes)
}
