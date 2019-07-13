const {
  startOfDay,
  endOfDay,
  startOfHour,
  parseISO,
  isBefore,
  isAfter,
  subHours,
  setHours,
  setMinutes,
  setSeconds,
  format,
} = require('date-fns')
const { Op } = require('sequelize')

const Repository = require('../Repositories/AppointmentRepository')

const AppointmentRepository = new Repository()
const {
  createFromAppointment: createNotificationFromAppointment,
} = require('../../Notifications/Services')
const Queue = require('../../../../lib/Queue')
const CancellationMail = require('../Jobs/CancellationMail')

const getAllAvailable = async (providerId, date) => {
  const schedules = [
    '07:00',
    '08:00',
    '09:00',
    '10:00',
    '11:00',
    '12:00',
    '13:00',
    '14:00',
    '15:00',
    '16:00',
    '17:00',
    '18:00',
    '19:00',
  ]

  const searchDate = parseISO(date)

  const params = {
    provider_id: providerId,
    date: {
      [Op.between]: [startOfDay(searchDate), endOfDay(searchDate)],
    },
  }

  const appointments = await AppointmentRepository.getAll(params)

  const newSchedules = await Promise.all(
    schedules.map(
      time =>
        new Promise(async resolve => {
          const [hour, minute] = time.split(':')
          const parseDate = parseISO(date)
          const dateTime = setSeconds(
            setMinutes(setHours(parseDate, hour), minute),
            0,
          )

          const value = format(dateTime, "yyyy-MM-dd'T'HH:mm:ssxxx")

          const result = {
            time,
            value,
            available:
              isAfter(dateTime, new Date()) &&
              !appointments.find(
                appointment => format(appointment.date, 'HH:mm') === time,
              ),
          }

          resolve(result)
        }),
    ),
  )

  return newSchedules
}

const available = async (providerId, date) => {
  /**
   * check for past dates
   */
  const hourStart = startOfHour(parseISO(date))

  if (isBefore(hourStart, new Date())) {
    return false
  }

  /**
   * Check date availability
   */
  const isAvailable = await AppointmentRepository.isAvailable(
    providerId,
    hourStart,
  )

  return isAvailable
}

const create = async (data, user) => {
  const appointment = await AppointmentRepository.setUser(user).create(data)
  await createNotificationFromAppointment(appointment, user)

  return appointment
}

const cancel = async appointment => {
  const dateWithSub = subHours(appointment.date, 2)

  if (isBefore(dateWithSub, new Date())) {
    return false
  }

  appointment.canceled_at = new Date()
  appointment.save()

  const { provider, user } = appointment

  Queue.add(CancellationMail.key, {
    appointment,
    provider,
    user,
  })

  return appointment
}

module.exports = {
  getAllAvailable,
  available,
  create,
  cancel,
}
