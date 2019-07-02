class Repository {
  findById(id) {
    return this.findBy(id)
  }
  findBy(value, field = 'id') {
    return this.model.findOne({
      where: {
        [field]: value,
      },
    })
  }
  async create(data) {
    const entity = await this.model.create(data)

    return entity
  }
  async update(entity, data) {}
}

module.exports = Repository
