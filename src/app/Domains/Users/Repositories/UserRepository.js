const { isEmpty } = require('lodash')

const User = require('../User')
const File = require('../../Files/File')
const Repository = require('../../../Support/Domain/Repositories/Repository')

const defaultAttributes = ['id', 'name', 'email', 'provider', 'avatar_id']

const parserUser = ({ id, name, email, provider, avatar_id, avatar }) => ({
  id,
  name,
  email,
  provider,
  avatar_id,
  avatar,
})

const defaultInclude = [
  {
    model: File,
    as: 'avatar',
    attributes: ['name', 'path', 'url_avatar', 'user_id'],
  },
]

class UserRepository extends Repository {
  constructor() {
    super()
    this.model = User
  }
  async findBy(value, field = 'id') {
    const where =  {
      [field]: value,
    }
    if (this.onlyProvider) {
      where['provider'] = true
    }
    const model = await this.model.findOne({ where })

    return model
  },
  async getAll(
    params = {},
    order = [],
    attributes = defaultAttributes,
    include = defaultInclude,
  ) {
    const where = { ...params }
    if (this.onlyProvider) {
      where['provider'] = true
    }

    const find = { where, order, attributes, include }
    if (isEmpty(attributes)) {
      delete find.attributes
    }

    const users = await this.model.findAll(find)

    return users
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
