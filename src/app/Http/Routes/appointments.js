const AppointmentController = require('../Controllers/AppointmentController')

module.exports = (server, routes, prefix = '/appointments') => {
  routes.get('/', AppointmentController.index)
  routes.post('/', AppointmentController.store)
  routes.delete('/:id', AppointmentController.delete)

  server.use(prefix, routes)
}
