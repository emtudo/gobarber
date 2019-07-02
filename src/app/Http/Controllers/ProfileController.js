const UserRepository = require('../../Domains/Users/Repositories/UserRepository')

const checkEmailExists = async email => {
  const exists = await UserRepository.findUserByEmail(email)

  return exists
}

class ProfileController {
  async update(request, response) {
    const { user, body } = request
    const { email } = body

    if (email && user.email !== email && (await checkEmailExists(email))) {
      return response.status(400).json({ error: 'Email already exists' })
    }

    const userUpdated = await UserRepository.update(user, body)
    if (!userUpdated) {
      return response.status(400).json({ error: 'Failed to update profile' })
    }

    return response.json(userUpdated)
  }
}

module.exports = new ProfileController()
