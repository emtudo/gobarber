const UserRepository = require('./UserRepository')

class ProviderRepository extends UserRepository {
  constructor() {
    super()
    this.onlyProvider = true
  }
}

module.exports = ProviderRepository
