const Repository = require('../../Domains/Files/Repositories/FileRepository')

const FileRepository = new Repository()

class FileController {
  async store(request, response) {
    const { originalname: name, filename: path } = request.file
    const { user } = request

    const data = {
      user_id: user.id,
      name,
      path,
    }
    const file = await FileRepository.create(data)

    return response.json(file)
  }
}

module.exports = new FileController()
