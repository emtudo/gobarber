const Yup = require('yup')

const schema = Yup.object().shape({
  name: Yup.string(),
  email: Yup.string().email(),
  current_password: Yup.string()
    .min(6)
    .when('password', (currentPassword, field) =>
      currentPassword ? field.required() : field,
    ),
  password: Yup.string().min(6),
})

module.exports = schema
