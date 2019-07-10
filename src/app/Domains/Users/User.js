const Sequelize = require('sequelize')
const bcrypt = require('bcryptjs')
const Model = require('../../Support/Domain/Model')

const defines = {
  name: Sequelize.STRING,
  email: Sequelize.STRING,
  password: Sequelize.VIRTUAL,
  password_hash: Sequelize.STRING,
  provider: Sequelize.BOOLEAN,
}

class User extends Model {
  static init(sequelize) {
    super.init(defines, { sequelize })

    this.addHook('beforeSave', async user => {
      if (user.password) {
        user.password_hash = await bcrypt.hash(user.password, 10)
      }
    })

    return this
  }

  static associate(models) {
    this.belongsTo(models.File, { foreignKey: 'avatar_id', as: 'avatar' })
  }
}

module.exports = User
