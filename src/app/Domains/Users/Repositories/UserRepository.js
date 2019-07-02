const jwt = require('jsonwebtoken')

const User = require('../User')
const Repository = require('../../../Support/Domain/Repositories/Repository')
const bcrypt = require('bcryptjs')
const authConfig = require('../../../../config/auth')

class UserRepository extends Repository {
  constructor() {
    super()
    this.model = User
  }
  async findUserByEmail(email) {
    return this.model.findOne({ where: { email } })
  }
  async create(data) {
    const { id, name, email, provider } = await super.create(data)

    return {
      id,
      name,
      email,
      provider,
    }
  }
  async checkPassword(user, password) {
    return bcrypt.compare(password, user.password)
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

module.exports = new UserRepository()
