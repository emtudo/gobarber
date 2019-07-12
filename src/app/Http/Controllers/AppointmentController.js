const { startOfHour, parseISO, isBefore } = require('date-fns')

const Repository = require('../../Domains/Appointments/Repositories/AppointmentRepository')
const AppointmentRepository = new Repository()
const BaseProviderRepository = require('../../Domains/Users/Repositories/ProviderRepository')
const ProviderRepository = new BaseProviderRepository()

const { create: validationCreate } = require('../../Domains/Appointments/Rules')

class AppointmentController {
  async index({ query, user }, response) {
    const { page = 1, limit } = query
    const appointments = await AppointmentRepository.setLimit(limit, page)
      .setUser(user)
      .getAllNoCancel()

    return response.json(appointments)
  }
  async store({ body, user }, response) {
    if (!(await validationCreate.isValid(body))) {
      return response.status(422).json({ error: 'Validation fails' })
    }
    const { provider_id, date } = body
    const provider = await ProviderRepository.findById(provider_id)
    if (!provider) {
      return response.status(400).json({
        error: 'Provider do not exists.',
      })
    }

    /**
     * check for past dates
     */
    const hourStart = startOfHour(parseISO(date))

    if (isBefore(hourStart, new Date())) {
      return response.status(400).json({ error: 'Past date are not permitted' })
    }

    /**
     * Check date availability
     */
    const isAvailable = await AppointmentRepository.isAvailable(
      provider_id,
      hourStart,
    )

    if (!isAvailable) {
      return response
        .status(400)
        .json({ error: 'Appointment date unavailable' })
    }

    const params = {
      provider_id,
      date: hourStart,
    }

    const appointment = await AppointmentRepository.setUser(user).create(
      params,
      user,
    )

    return response.json(appointment)
  }
  async delete({ user, params }, response) {
    const appointment = await AppointmentRepository.setUser(user)
      .setIncludeEmail()
      .findById(params.id)

    const canceled = await AppointmentRepository.cancel(appointment, user)

    if (!canceled) {
      return response
        .status(401)
        .json({ error: 'You can only cancel appointments 2 hours in advance' })
    }

    const appointmentCancel = await AppointmentRepository.setUser(user)
      .setIncludeNoEmail()
      .findById(params.id)

    return response.json(appointmentCancel)
  }
}

module.exports = new AppointmentController()
