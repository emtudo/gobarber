const { isBefore, subHours } = require('date-fns')

const Appointment = require('../Appointment')
const Repository = require('../../../Support/Domain/Repositories/Repository')
const includeUser = require('./_includeUser')
const includeProvider = includeUser('provider')
const {
  createFromAppointment: createNotificationFromAppointment,
} = require('../../Notifications/Repositories/NotificationRepository')
const Mail = require('../../../../lib/Mail')
const { formattedDate } = require('../../../../helpers')

class AppointmentRepository extends Repository {
  constructor() {
    super()
    this.model = Appointment
    this.user_id = null
    this.order = [['date', 'DESC']]
    this.include = [includeProvider]
  }

  setIncludeEmail(as = 'provider') {
    const include = includeUser(as, ['id', 'name', 'email'])

    this.include = [include]

    return this
  }

  setIncludeNoEmail(as = 'provider') {
    const include = includeUser(as, ['id', 'name'])

    this.include = [include]

    return this
  }

  async create(data, user) {
    const appointment = await super.create(data)
    await createNotificationFromAppointment(appointment, user)

    return appointment
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

  async cancel(appointment, user) {
    const dateWithSub = subHours(appointment.date, 2)

    if (isBefore(dateWithSub, new Date())) {
      return false
    }

    appointment.canceled_at = new Date()
    appointment.save()

    const { provider } = appointment

    const { name, email } = provider
    console.log({ date: appointment.date })
    const date = formattedDate(appointment.date)
    console.log({ date })

    await Mail.sendMail({
      to: `${name} <${email}>`,
      subject: 'Agendamento cancelado',
      template: 'cancellation',
      context: {
        user_name: user.name,
        provider_name: name,
        date,
      },
    })

    return appointment
  }
}

module.exports = AppointmentRepository
