const Sequelize = require('sequelize')
const Model = require('../../Support/Domain/Model')

const defines = {
  name: Sequelize.STRING,
  path: Sequelize.STRING,
  url_avatar: {
    type: Sequelize.VIRTUAL,
    get() {
      return `${process.env.APP_URL}/avatar/${this.path}`
    },
  },
  url: {
    type: Sequelize.VIRTUAL,
    get() {
      return `http://localhost:3333/files/${this.user_id}/${this.path}`
    },
  },
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
