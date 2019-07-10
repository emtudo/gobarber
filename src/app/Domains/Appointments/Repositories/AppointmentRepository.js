const Appointment = require('../Appointment')
const Repository = require('../../../Support/Domain/Repositories/Repository')
const includeProvider = require('./_includeUser')('provider')

class AppointmentRepository extends Repository {
  constructor() {
    super()
    this.model = Appointment
    this.user_id = null
    this.order = [['date', 'DESC']]
    this.include = [includeProvider]
  }

  async getAllNoCancel(params = {}) {
    const newParams = {...params, canceled_at: null}
    const appointments = await super.getAll(newParams)

    return appointments
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
