const { create } = require('../../Domains/Files/Services')

class AvatarController {
  async store(request, response) {
    const {
      id,
      user_id,
      name,
      path,
      createdAt,
      updatedAt,
      url_avatar,
    } = await create(request)

    return response.json({
      id,
      user_id,
      name,
      path,
      createdAt,
      updatedAt,
      url_avatar,
    })
  }
}

module.exports = new AvatarController()
