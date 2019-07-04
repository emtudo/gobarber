const File = require('../File')
const Repository = require('../../../Support/Domain/Repositories/Repository')

class FileRepository extends Repository {
  constructor() {
    super()
    this.model = File
  }
}

module.exports = FileRepository
