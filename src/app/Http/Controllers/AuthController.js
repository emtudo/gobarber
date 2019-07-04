const Repository = require('../../Domains/Users/Repositories/AuthRepository')

const AuthRepository = new Repository()

class AuthController {
  async store(request, response) {
    const { email, password } = request.body
    const user = await AuthRepository.findUserByEmail(email)
    if (!user) {
      return response.status(401).json({
        error: 'Unauthorized',
      })
    }

    if (!(await AuthRepository.checkPassword(user, password))) {
      return response.status(401).json({
        error: 'Unauthorized',
      })
    }

    return response.json(AuthRepository.auth(user))
  }
}

module.exports = new AuthController()
