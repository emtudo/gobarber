const Appointment = require('../Appointment')
const Repository = require('../../../Support/Domain/Repositories/Repository')

class AppointmentRepository extends Repository {
  constructor() {
    super()
    this.model = Appointment
  }

  async isAvailable(provider_id, date) {
    const where =  {
      provider_id,
      canceled_at: null,
      date
    }
    const model = await this.model.findOne({ where })

    return (model) ? false : true
  },
}

module.exports = AppointmentRepository
