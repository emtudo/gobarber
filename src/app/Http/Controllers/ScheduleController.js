const Repository = require('../../Domains/Appointments/Repositories/ScheduleRepository')
const ScheduleRepository = new Repository()

const {
  schedule: validationQuery,
} = require('../../Domains/Appointments/Rules')

class ScheduleController {
  async index(request, response) {
    const { page = 1, limit, date } = request.query

    if (!(await validationQuery.isValid(request.query))) {
      return response.status(422).json({ error: 'Validation fails' })
    }

    const appointments = await ScheduleRepository.setLimit(limit, page)
      .setUser(request.user)
      .getScheduleFromDate(date)

    return response.json(appointments)
  }
}

module.exports = new ScheduleController()
