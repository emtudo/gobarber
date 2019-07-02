const Sequelize = require('sequelize')

const { Model: SequelizeModel } = require('sequelize')
const uuid = require('uuid/v4')

class Model extends SequelizeModel {
  static init(defines, sequelize) {
    super.init(defines, sequelize)
    this.addHook('beforeCreate', model => {
      model.id = uuid()
    })

    return this
  }
}

module.exports = Model
