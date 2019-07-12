const { isBefore, subHours } = require('date-fns')

const Repository = require('../Repositories/AppointmentRepository')

const AppointmentRepository = new Repository()
const {
  createFromAppointment: createNotificationFromAppointment,
} = require('../../Notifications/Services')
const Queue = require('../../../../lib/Queue')
const CancellationMail = require('../Jobs/CancellationMail')

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
  create,
  cancel,
}
