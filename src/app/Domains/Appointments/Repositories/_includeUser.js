const User = require('../../Users/User')
const File = require('../../Files/File')

const getInclude = as => ({
  model: User,
  as,
  attributes: ['id', 'name'],
  include: [
    {
      model: File,
      as: 'avatar',
      attributes: ['id', 'path', 'url_avatar'],
    },
  ],
})

module.exports = getInclude
