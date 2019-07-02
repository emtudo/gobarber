const User = require('../User')
const SupportRepository = require('../../../Support/Domain/Repositories/Repository')

const parserUser = ({ id, name, email, provider }) => ({
  id,
  name,
  email,
  provider,
})

class Repository extends SupportRepository {
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

module.exports = Repository
