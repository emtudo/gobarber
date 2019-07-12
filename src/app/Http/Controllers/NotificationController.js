const {
  getAllByParams,
  setRead,
  findById,
} = require('../../Domains/Notifications/Repositories/NotificationRepository')

class NotificationController {
  async index({ user }, response) {
    const params = { user: user.id, read: false }
    const notifications = await getAllByParams(params)

    return response.json(notifications)
  }
  async update({ user, params }, response) {
    const { id } = params
    const notification = await findById(id)
    if (notification.user !== user.id) {
      return response.status(403).json({ error: 'Unauthorized' })
    }

    const readNotification = await setRead(id)

    return response.json(readNotification)
  }
}

module.exports = new NotificationController()
