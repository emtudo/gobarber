const AuthRepository = require('../../Domains/Users/Repositories/AuthRepository')

module.exports = async (request, response, next) => {
  const authHeader = request.headers.authorization

  if (!authHeader) {
    return response.status(401).json({ error: 'Token not provided' })
  }

  const [, token] = authHeader.split(' ')

  try {
    const { id } = await AuthRepository.verifyToken(token)
    request.user = await AuthRepository.findById(id)
  } catch ({ message }) {
    return response.status(401).json({ error: message })
  }

  return next()
}
