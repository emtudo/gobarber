const Appointment = require('../Appointment')
const Repository = require('../../../Support/Domain/Repositories/Repository')
const User = require('../../Users/User')
const File = require('../../Files/File')

const getInclude = as => ({
  model: User,
  as,
  attributes: ['id', 'name'],
  include: [{
    model: File,
    as: 'avatar',
    attributes: ['id', 'path', 'url_avatar']
  }]
})

const includeUser = getInclude('user')
const includeProvider = getInclude('provider')

class AppointmentRepository extends Repository {
  constructor() {
    super()
    this.model = Appointment
    this.user_id = null
    this.order = [['date', 'DESC']]
    this.include = [includeUser, includeProvider]
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
