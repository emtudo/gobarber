const Yup = require('yup')

const schema = Yup.object().shape({
  date: Yup.date().nullable(),
})

module.exports = schema
