const Repository = require('../../Domains/Files/Repositories/FileRepository')

const FileRepository = new Repository()

const create = async request => {
  const { originalname: name, filename: path } = request.file
  const { user } = request

  const data = {
    user_id: user.id,
    name,
    path,
  }
  const file = await FileRepository.create(data)

  return file
}

module.exports = { create }
