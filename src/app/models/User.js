const Sequelize = require('sequelize')
const bcrypt = require('bcryptjs')
const uuid = require('uuid/v4')

const { Model } = Sequelize

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password: Sequelize.STRING,
        provider: Sequelize.BOOLEAN,
      },
      {
        sequelize,
      },
    )
    this.addHook('beforeCreate', user => {
      user.id = uuid()
    })

    this.addHook('beforeSave', async user => {
      if (user.password) {
        user.password = await bcrypt.hash(user.password, 10)
      }
    })

    return this
  }
}

module.exports = User
