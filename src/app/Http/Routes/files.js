const express = require('express')
const { resolve } = require('path')
const multer = require('multer')
const multerConfigUpload = require('../../../config/multer_upload')
const multerConfigAvatar = require('../../../config/multer_avatar')
const upload = multer(multerConfigUpload)
const avatar = multer(multerConfigAvatar)

const FileController = require('../Controllers/FileController')
const AvatarController = require('../Controllers/AvatarController')

module.exports = (server, routes, prefix = '/files') => {
  routes.post('', upload.single('file'), FileController.store)
  routes.post('/avatar', avatar.single('file'), AvatarController.store)
  server.use(prefix, routes)

  const path = resolve(__dirname, '..', '..', '..', '..', 'tmp', 'uploads')

  server.use(prefix, express.static(resolve(path)))
}
