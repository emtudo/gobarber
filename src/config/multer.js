const multer = require('multer')
const crypto = require('crypto')
const fs = require('fs-extra')
const { extname, resolve } = require('path')

module.exports = {
  storage: multer.diskStorage({
    destination: (request, file, callback) => {
      const path = resolve(
        __dirname,
        '..',
        '..',
        'tmp',
        'uploads',
        request.user.id,
      )

      try {
        fs.mkdirsSync(path)
      } catch (error) {}

      callback(null, path)
    },

    filename: (request, file, callback) => {
      crypto.randomBytes(16, (error, response) => {
        if (error) {
          return callback(error)
        }

        callback(
          null,
            response.toString('hex') +
            extname(file.originalname),
        )
      })
    },
  }),
}
