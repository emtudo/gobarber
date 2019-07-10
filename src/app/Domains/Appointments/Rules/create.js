const Yup = require('yup')

const schema = Yup.object().shape({
  date: Yup.date().required(),
  provider_id: Yup.string().required(),
})

module.exports = schema
