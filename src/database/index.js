const Sequelize = require('sequelize')
const mongoose = require('mongoose')

const databaseConfig = require('../config/database')

const User = require('../app/Domains/Users/User')
const File = require('../app/Domains/Files/File')
const Appointment = require('../app/Domains/Appointments/Appointment')

const models = [User, File, Appointment]

class Database {
  constructor() {
    this.init()
    this.mongo()
  }

  init() {
    this.connection = new Sequelize(databaseConfig)

    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models))
  }

  mongo() {
    this.mongoConnection = mongoose.connect(
      'mongodb://localhost:27017/gobarber',
      {
        useNewUrlParser: true,
        useFindAndModify: true,
      },
    )
  }
}

module.exports = new Database()
