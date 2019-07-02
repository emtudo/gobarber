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
}

module.exports = new UserController()
