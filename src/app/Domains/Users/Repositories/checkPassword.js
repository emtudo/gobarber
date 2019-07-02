const bcrypt = require('bcryptjs')

const checkPassword = (user, password) => {
  if (!password) {
    return false
  }

  return bcrypt.compare(password, user.password_hash)
}

module.exports = checkPassword
