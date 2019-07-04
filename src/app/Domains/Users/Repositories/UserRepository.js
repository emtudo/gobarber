const User = require('../User')
const Repository = require('../../../Support/Domain/Repositories/Repository')

const parserUser = ({ id, name, email, provider }) => ({
  id,
  name,
  email,
  provider,
})

class UserRepository extends Repository {
  constructor() {
    super()
    this.model = User
  }
  async findUserByEmail(email) {
    return this.model.findOne({ where: { email } })
  }
  async create(data) {
    const user = await super.create(data)

    return parserUser(user)
  }
  async update(user, data) {
    const userUpdated = await super.update(user, data)

    return parserUser(userUpdated)
  }
}

module.exports = UserRepository
