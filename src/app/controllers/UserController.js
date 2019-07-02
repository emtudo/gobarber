const User = require('../models/User')

const findUserByEmail = email => User.findOne({ where: { email } })
class UserController {
  async store(request, response) {
    const { email } = request.body
    if (await findUserByEmail(email)) {
      return response.status(400).json({
        error: 'User already exists.',
      })
    }
    const { id, name, provider } = await User.create(request.body)

    return response.json({
      id,
      name,
      email,
      provider,
    })
  }
}

module.exports = new UserController()
