const Repository = require('../../Domains/Users/Repositories/ProviderRepository')

const ProviderRepository = new Repository()

class ProviderController {
  async index(request, response) {
    const providers = await ProviderRepository.getAll()

    return response.json(providers)
  }
}

module.exports = new ProviderController()
