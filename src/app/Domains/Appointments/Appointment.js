const Sequelize = require('sequelize')
const Model = require('../../Support/Domain/Model')

const defines = {
  date: Sequelize.DATE,
  canceled_at: Sequelize.DATE,
}

class Appointment extends Model {
  static init(sequelize) {
    super.init(defines, { sequelize })

    return this
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' })
    this.belongsTo(models.User, { foreignKey: 'provider_id', as: 'provider' })
  }
}

module.exports = Appointment
