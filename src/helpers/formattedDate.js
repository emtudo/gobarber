const { format } = require('date-fns')
const locale = require('date-fns/locale/pt')

const formattedDate = date =>
  format(date, "'dia' dd 'de' MMMM, 'às' H:mm'h'", {
    locale,
  })

module.exports = formattedDate
