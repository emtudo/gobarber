const { isEmpty } = require('lodash')

const getData = (context, params) => {
  const { user_id, data } = context

  const newData = {
    ...(data || {}),
    ...params,
  }

  if (user_id) {
    newData['user_id'] = user_id
  }

  return newData
}

const getWhere = (context, params) => {
  const { user_id, where } = context

  const data = {
    ...(where || {}),
    ...params,
  }

  if (user_id) {
    data['user_id'] = user_id
  }

  return data
}

class Repository {
  setUser({ id }) {
    this.user_id = id
    return this
  }
  setUserId(userId) {
    this.user_id = userId

    return this
  }
  async getAll(params = {}, attributes = [], include = []) {
    const where = getWhere(this, params)

    const find = { where, attributes, include }
    if (isEmpty(attributes)) {
      delete find.attributes
    }
    if (isEmpty(include)) {
      delete find.include
    }
    if (!isEmpty(this.user_id)) {
      find['user_id'] = this.user_id
    }

    const users = await this.model.findAll(find)

    return users
  }
  async findById(id) {
    const entity = await this.findBy(id)

    return entity
  }
  async findBy(value, field = 'id') {
    const where = getWhere(this, {
      [field]: value,
    })

    const model = await this.model.findOne({
      where,
    })

    return model
  }
  async create(data) {
    const newData = getData(this, data)
    const entity = await this.model.create(newData)

    return entity
  }
  async update(entity, data) {
    const newData = getData(this, data)

    return entity.update(data)
  }
}

module.exports = Repository
