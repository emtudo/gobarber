const UserRepository = require('../../Domains/Users/Repositories/UserRepository')
const {
  create: validationCreate,
  update: validationUpdate,
} = require('../../Domains/Users/Rules')

const checkEmailExists = async email => {
  const exists = await UserRepository.findUserByEmail(email)

  return exists
}

class UserController {
  async store(request, response) {
    if (!(await validationCreate.isValid(request.body))) {
      return response.status(400).json({ error: 'Validation fails' })
    }
    const { email } = request.body
    if (await UserRepository.findUserByEmail(email)) {
      return response.status(422).json({
        error: 'User already exists.',
      })
    }

    const user = await UserRepository.create(request.body)

    return response.json(user)
  }
  async update(request, response) {
    const { id } = request.params
    const { body } = request
    const { email } = body
    if (!(await validationUpdate.isValid(body))) {
      return response.status(422).json({ error: 'Validation fails' })
    }

    let user
    try {
      user = await UserRepository.findById(id)
    } catch (err) {
      return response.status(400).json({ error: '1User not found' })
    }

    if (email && user.email !== email && (await checkEmailExists(email))) {
      return response.status(400).json({ error: 'Email already exists' })
    }

    const userUpdated = await UserRepository.update(user, body)
    if (!userUpdated) {
      return response.status(400).json({ error: 'Failed to update user' })
    }

    return response.json(userUpdated)
  }
}

module.exports = new UserController()
