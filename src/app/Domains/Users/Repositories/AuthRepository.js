const jwt = require('jsonwebtoken')
const { promisify } = require('util')

const User = require('../User')
const UserRepository = require('./UserRepository')
const authConfig = require('../../../../config/auth')
const checkPassword = require('./checkPassword')

class AuthRepository extends UserRepository {
  constructor() {
    super()
    this.model = User
  }
  async verifyToken(token) {
    const { secret } = authConfig

    try {
      const decoded = await promisify(jwt.verify)(token, secret)

      return Promise.resolve(decoded)
    } catch (err) {
      return Promise.reject(new Error('Token invalid'))
    }
  }
  async checkPassword(user, password) {
    return checkPassword(user, password)
  }
  auth(user) {
    const { id, name, email } = user
    const { secret, expiresIn } = authConfig

    return {
      user: {
        id,
        name,
        email,
      },
      token: jwt.sign({ id }, secret, {
        expiresIn,
      }),
    }
  }
}

module.exports = AuthRepository
