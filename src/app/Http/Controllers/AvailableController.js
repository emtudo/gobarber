const { getAllAvailable } = require('../../Domains/Appointments/Services')

class AvailableController {
  async index({ query, params }, response) {
    const { date } = query
    if (!date) {
      return response.status(400).json({ error: 'Invalid date' })
    }
    const searchDate = date

    const availables = await getAllAvailable(params.id, searchDate)

    return response.json(availables)
  }
}

module.exports = new AvailableController()
