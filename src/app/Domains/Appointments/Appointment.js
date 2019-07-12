const Sequelize = require('sequelize')
const Model = require('../../Support/Domain/Model')
const { isBefore, subHours } = require('date-fns')

const defines = {
  date: Sequelize.DATE,
  canceled_at: Sequelize.DATE,
  past: {
    type: Sequelize.VIRTUAL,
    get() {
      return isBefore(this.date, new Date())
    },
  },
  cancelable: {
    type: Sequelize.VIRTUAL,
    get() {
      return isBefore(new Date(), subHours(this.date, 2))
    },
  },
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
