const { startOfHour, parseISO, isBefore } = require('date-fns')

const Repository = require('../../Domains/Appointments/Repositories/AppointmentRepository')
const AppointmentRepository = new Repository()
const BaseProviderRepository = require('../../Domains/Users/Repositories/ProviderRepository')
const ProviderRepository = new BaseProviderRepository()

const { create: validationCreate } = require('../../Domains/Appointments/Rules')

class AppointmentController {
  async index(request, response) {
    const { page = 1, limit } = request.query
    const appointments = await AppointmentRepository.setLimit(limit, page)
      .setUser(request.user)
      .getAllNoCancel()

    return response.json(appointments)
  }
  async store(request, response) {
    if (!(await validationCreate.isValid(request.body))) {
      return response.status(422).json({ error: 'Validation fails' })
    }
    const { provider_id: providerId, date } = request.body
    const provider = await ProviderRepository.findById(providerId)
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

    const appointment = await AppointmentRepository.setUser(
      request.user,
    ).create(params)

    return response.json(appointment)
  }
}

module.exports = new AppointmentController()
