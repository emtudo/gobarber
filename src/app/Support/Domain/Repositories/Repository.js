const { isEmpty } = require('lodash')

class Repository {
  async getAll(params = {}, attributes = [], include = []) {
    const where = { ...params }

    const find = { where, attributes, include }
    if (isEmpty(attributes)) {
      delete find.attributes
    }
    if (isEmpty(include)) {
      delete find.include
    }

    const users = await this.model.findAll(find)

    return users
  }
  async findById(id) {
    const entity = await this.findBy(id)

    return entity
  }
  async findBy(value, field = 'id') {
    const model = await this.model.findOne({
      where: {
        [field]: value,
      },
    })

    return model
  }
  async create(data) {
    const entity = await this.model.create(data)

    return entity
  }
  async update(entity, data) {
    return entity.update(data)
  }
}

module.exports = Repository
