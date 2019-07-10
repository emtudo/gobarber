const Sequelize = require('sequelize')

const databaseConfig = require('../config/database')

const User = require('../app/Domains/Users/User')
const File = require('../app/Domains/Files/File')
const Appointment = require('../app/Domains/Appointments/Appointment')

const models = [User, File, Appointment]

class Database {
  constructor() {
    this.init()
  }

  init() {
    this.connection = new Sequelize(databaseConfig)

    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models))
  }
}

module.exports = new Database()
