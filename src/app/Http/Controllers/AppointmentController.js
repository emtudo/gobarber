const Repository = require('../../Domains/Appointments/Repositories/AppointmentRepository')
const AppointmentRepository = new Repository()
const BaseProviderRepository = require('../../Domains/Users/Repositories/ProviderRepository')
const ProviderRepository = new BaseProviderRepository()

const { create: validationCreate } = require('../../Domains/Appointments/Rules')

class AppointmentController {
  async index(request, response) {
    const appointments = await AppointmentRepository.getAll()

    return response.json(appointments)
  }
  async store(request, response) {
    if (!(await validationCreate.isValid(request.body))) {
      return response.status(422).json({ error: 'Validation fails' })
    }
    const { provider_id } = request.body
    const provider = await ProviderRepository.findById(provider_id)
    console.log({ provider })
    if (!provider) {
      return response.status(400).json({
        error: 'Provider do not exists.',
      })
    }

    const appointment = await AppointmentRepository.create(request.body)

    return response.json(appointment)
  }
}

module.exports = new AppointmentController()
