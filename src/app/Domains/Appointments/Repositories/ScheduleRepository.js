const { startOfDay, endOfDay, parseISO } = require('date-fns')
const { Op } = require('sequelize')

const Repository = require('./AppointmentRepository')
const includeUser = require('./_includeUser')('user')

const getParams = date => {
  const newDate = parseISO(date)
  if (!date) {
    return {}
  }

  return {
    date: {
      [Op.between]: [startOfDay(newDate), endOfDay(newDate)],
    },
  }
}

class ScheduleRepository extends Repository {
  constructor() {
    super()
    this.include = [includeUser]
  }

  async getScheduleFromDate(date) {
    const params = getParams(date)
    console.log({ params })
    const schedules = await this.getAllNoCancel(params)

    return schedules
  }
}

module.exports = ScheduleRepository
