const Sequelize = require('sequelize')
const Model = require('../../Support/Domain/Model')

const defines = {
  name: Sequelize.STRING,
  path: Sequelize.STRING,
}

class File extends Model {
  static init(sequelize) {
    super.init(defines, { sequelize })

    return this
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id' })
  }
}

module.exports = File
