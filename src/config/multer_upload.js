const multer = require('multer')
const { destination, filename } = require('./multer')

module.exports = {
  storage: multer.diskStorage({
    destination,

    filename,
  }),
}
