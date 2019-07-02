const AuthRepository = require('../../Domains/Users/Repositories/AuthRepository')

const checkPassword = async (user, password) => {
  const valid = await AuthRepository.checkPassword(user, password)

  return valid
}

module.exports = async (request, response, next) => {
  const { current_password: currentPassword, password } = request.body

  if (!password) {
    return next()
  }

  if (await checkPassword(request.user, currentPassword)) {
    return next()
  }

  return response.status(400).json({ error: 'Current password is invalid' })
}
