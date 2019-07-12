const Repository = require('../../Domains/Appointments/Repositories/AppointmentRepository')
const AppointmentRepository = new Repository()
const BaseProviderRepository = require('../../Domains/Users/Repositories/ProviderRepository')
const ProviderRepository = new BaseProviderRepository()
const {
  create,
  cancel,
  available,
} = require('../../Domains/Appointments/Services')

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

    if (!(await available(provider_id, date))) {
      return response
        .status(400)
        .json({ error: 'Appointment date unavailable' })
    }

    const params = {
      provider_id,
      date,
    }

    const appointment = await create(params, user)

    return response.json(appointment)
  }

  async delete({ user, params }, response) {
    const appointment = await AppointmentRepository.setUser(user)
      .setIncludeEmailAndUser()
      .findById(params.id)

    const canceled = await cancel(appointment)

    if (!canceled) {
      return response
        .status(401)
        .json({ error: 'You can only cancel appointments 2 hours in advance' })
    }

    const appointmentCancel = await AppointmentRepository.setUser(user)
      .setIncludeNoEmailNoUser()
      .findById(params.id)

    return response.json(appointmentCancel)
  }
}

module.exports = new AppointmentController()
