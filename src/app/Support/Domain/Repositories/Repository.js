const { isEmpty } = require('lodash')

const mergeObjectWithUser = (userId, data, params) => {
  const newData = objectMergeParams(data, params)

  if (userId) {
    newData['user_id'] = userId
  }

  return newData
}

const arrayMergeParams = (data, params = []) => [...(data || []), ...params]

const objectMergeParams = (data, params) => ({
  ...(data || {}),
  ...params,
})

const getData = ({ user_id: userId, data }, params) =>
  mergeObjectWithUser(userId, data, params)

const getWhere = ({ user_id: userId, where }, params) =>
  mergeObjectWithUser(userId, where, params)

const getOrder = ({ order }, params) => arrayMergeParams(order, params)

const getInclude = ({ include }, params) => arrayMergeParams(include, params)

class Repository {
  constructor() {
    this.limit = 100
    this.page = 1
  }
  setUser({ id }) {
    this.user_id = id
    return this
  }
  setUserId(userId) {
    this.user_id = userId

    return this
  }
  setLimit(limit, page) {
    if (limit) {
      this.limit = limit
    }
    if (page) {
      this.setPage(page)
    }

    return this
  }
  setPage(page) {
    this.page = page

    return this
  }
  async getAll(params = {}, order = [], attributes = [], include = []) {
    const where = getWhere(this, params)

    const query = {
      where,
      order: getOrder(this, order),
      attributes,
      include: getInclude(this, include),
    }
    if (isEmpty(query.order)) {
      query.order = [['created_at', 'DESC']]
    }
    if (isEmpty(query.attributes)) {
      delete query.attributes
    }
    if (isEmpty(query.include)) {
      delete query.include
    }
    if (!isEmpty(this.user_id)) {
      query['user_id'] = this.user_id
    }
    if (this.limit) {
      query['limit'] = this.limit
    }
    if (this.page && this.limit) {
      query['offset'] = (this.page - 1) * this.limit
    }

    const entities = await this.model.findAll(query)

    return entities
  }
  async findById(id, params = {}) {
    const entity = await this.findBy(id, 'id', params)

    return entity
  }
  async findBy(value, field = 'id', params = {}) {
    const where = getWhere(this, {
      [field]: value,
    })

    const query = { ...params, where }

    const include = getInclude(this, [])
    if (!isEmpty(include)) {
      query['include'] = include
    }

    const model = await this.model.findOne(query)

    return model
  }
  async create(data) {
    const newData = getData(this, data)
    const entity = await this.model.create(newData)

    return entity
  }
  async update(entity, data) {
    const newData = getData(this, data)

    return entity.update(newData)
  }
}

module.exports = Repository
