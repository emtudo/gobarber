const { create } = require('./_createFile')

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
