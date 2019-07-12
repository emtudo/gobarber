const { create } = require('../../Domains/Files/Services')

class FileController {
  async store(request, response) {
    const { id, user_id, name, path, createdAt, updatedAt, url } = await create(
      request,
    )

    return response.json({ id, user_id, name, path, createdAt, updatedAt, url })
  }
}

module.exports = new FileController()
