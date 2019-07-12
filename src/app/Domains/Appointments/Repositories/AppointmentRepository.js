const Appointment = require('../Appointment')
const Repository = require('../../../Support/Domain/Repositories/Repository')
const includeUser = require('../Libs/_includeUser')
const includeProvider = includeUser('provider')

class AppointmentRepository extends Repository {
  constructor() {
    super()
    this.model = Appointment
    this.user_id = null
    this.order = [['date', 'DESC']]
    this.include = [includeProvider]
  }

  setIncludeEmailAndUser() {
    const provider = includeUser('provider', ['id', 'name', 'email'])
    const user = includeUser('user')

    this.include = [provider, user]

    return this
  }

  setIncludeNoEmailNoUser() {
    this.include = [includeProvider]

    return this
  }

  async getAllNoCancel(params = {}) {
    const newParams = { ...params, canceled_at: null }
    const appointments = await super.getAll(newParams)

    return appointments
  }

  async isAvailable(provider_id, date) {
    const where = {
      provider_id,
      canceled_at: null,
      date,
    }
    const model = await this.model.findOne({ where })

    return !model
  }
}

module.exports = AppointmentRepository
