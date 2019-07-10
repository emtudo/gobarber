const multer = require('multer')
const fs = require('fs-extra')
const { resolve } = require('path')
const { filename } = require('./multer')

module.exports = {
  storage: multer.diskStorage({
    destination: (request, file, callback) => {
      const path = resolve(__dirname, '..', '..', 'tmp', 'uploads')

      try {
        fs.mkdirsSync(path)
      } catch (error) {}

      callback(null, path)
    },

    filename,
  }),
}
