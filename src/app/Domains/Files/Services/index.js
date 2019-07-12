const Repository = require('../Repositories/FileRepository')

const FileRepository = new Repository()

const create = async ({ file, user }) => {
  const { originalname: name, filename: path } = file

  const data = {
    user_id: user.id,
    name,
    path,
  }
  const newFile = await FileRepository.create(data)

  return newFile
}

module.exports = { create }
