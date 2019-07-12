const { formattedDate } = require('../../../../helpers')

const Notification = require('../Notification')

const createFromAppointment = async (appointment, user) => {
  const { provider_id: providerId } = appointment
  const date = formattedDate(appointment.date)

  const notification = await Notification.create({
    content: `Novo Agendamento de ${user.name} para o ${date}`,
    user: providerId,
  })

  return notification
}

const findById = async id => {
  const notification = await Notification.findById(id)

  return notification
}

const getAllByParams = async (params = {}, limit = 1000) => {
  const notifications = await Notification.find(params)
    .sort('createdAt')
    .limit(limit)

  return notifications
}

const setRead = async id => {
  const notification = await Notification.findByIdAndUpdate(
    id,
    {
      read: true,
    },
    {
      new: true,
    },
  )

  return notification
}

module.exports = {
  findById,
  createFromAppointment,
  getAllByParams,
  setRead,
}
