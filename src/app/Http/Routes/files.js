const multer = require('multer')
const multerConfig = require('../../../config/multer')
const upload = multer(multerConfig)

const FileController = require('../Controllers/FileController')

module.exports = (server, routes, prefix = '/files') => {
  routes.post('', upload.single('file'), FileController.store)
  server.use(prefix, routes)
}
