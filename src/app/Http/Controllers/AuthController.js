const UserRepository = require('../../Domains/Users/Repositories/UserRepository')

class AuthController {
  async store(request, response) {
    const { email, password } = request.body
    const user = await UserRepository.findUserByEmail(email)
    if (!user) {
      return response.status(401).json({
        error: 'Unauthorized',
      })
    }

    if (!(await UserRepository.checkPassword(user, password))) {
      return response.status(401).json({
        error: 'Unauthorized',
      })
    }

    return response.json(UserRepository.auth(user))
  }
}

module.exports = new AuthController()
