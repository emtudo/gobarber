const User = require('../User')
const Repository = require('../../../Support/Domain/Repositories/Repository')

const parserUser = ({ id, name, email, provider, avatar_id }) => ({
  id,
  name,
  email,
  provider,
  avatar_id,
})

class UserRepository extends Repository {
  constructor() {
    super()
    this.model = User
  }
  async getAll(params = {}) {
    const where = { ...params }
    if (this.onlyProvider) {
      where['provider'] = true
    }
    const { onlyProvider } = this
    console.log({ where, onlyProvider })
    return this.model.findAll({ where })
  }
  async findUserByEmail(email) {
    const where = { email }
    if (this.onlyProvider) {
      where['provider'] = true
    }
    return this.model.findOne({ where })
  }
  async create(data) {
    if (this.onlyProvider) {
      data['provider'] = true
    }
    const user = await super.create(data)

    return parserUser(user)
  }
  async update(user, data) {
    if (this.onlyProvider) {
      delete data['provider']
    }
    const userUpdated = await super.update(user, data)

    return parserUser(userUpdated)
  }
}

module.exports = UserRepository
