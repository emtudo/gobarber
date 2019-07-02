const UserRepository = require('../../Domains/Users/Repositories/UserRepository')

class ProfileController {
  async update(request, response) {
    const { user, body } = request

    const userUpdated = await UserRepository.update(user, body)
    if (!userUpdated) {
      return response.status(400).json({ error: 'Failed to update user' })
    }

    return response.json(userUpdated)
  }
}

module.exports = new ProfileController()
