const UserRepository = require('../../Domains/Users/Repositories/UserRepository')

class UserController {
  async store(request, response) {
    const { email } = request.body
    if (await UserRepository.findUserByEmail(email)) {
      return response.status(400).json({
        error: 'User already exists.',
      })
    }

    const user = await UserRepository.create(request.body)

    return response.json(user)
  }
  async update(request, response) {
    const { id } = request.params
    const { body } = request

    let user
    try {
      user = await UserRepository.findById(id)
    } catch (err) {
      return response.status(400).json({ error: '1User not found' })
    }

    const userUpdated = await UserRepository.update(user, body)
    if (!userUpdated) {
      return response.status(400).json({ error: 'Failed to update user' })
    }

    return response.json(userUpdated)
  }
}

module.exports = new UserController()
