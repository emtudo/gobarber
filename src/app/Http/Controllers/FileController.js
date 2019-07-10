const { create } = require('./_createFile')

class FileController {
  async store(request, response) {
    const { id, user_id, name, path, createdAt, updatedAt, url } = await create(
      request,
    )

    return response.json({ id, user_id, name, path, createdAt, updatedAt, url })
  }
}

module.exports = new FileController()
