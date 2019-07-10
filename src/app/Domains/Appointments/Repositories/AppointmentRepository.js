const Appointment = require('../Appointment')
const Repository = require('../../../Support/Domain/Repositories/Repository')

class AppointmentRepository extends Repository {
  constructor() {
    super()
    this.model = Appointment
  }
}

module.exports = AppointmentRepository
