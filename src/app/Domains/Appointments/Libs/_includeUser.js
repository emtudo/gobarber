const User = require('../../Users/User')
const File = require('../../Files/File')

const getInclude = (as, attributes = ['id', 'name']) => ({
  model: User,
  as,
  attributes,
  include: [
    {
      model: File,
      as: 'avatar',
      attributes: ['id', 'path', 'url_avatar'],
    },
  ],
})

module.exports = getInclude
