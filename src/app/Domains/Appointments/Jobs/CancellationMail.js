const Mail = require('../../../../lib/Mail')
const { formattedDate } = require('../../../../helpers')
const { parseISO } = require('date-fns')

class CancellationMail {
  get key() {
    return 'CancellationMail'
  }
  async handle({ data }) {
    const { appointment, provider, user } = data

    console.log('a fila executou')

    const { name, email } = provider
    const date = formattedDate(parseISO(appointment.date))

    await Mail.sendMail({
      to: `${name} <${email}>`,
      subject: 'Agendamento cancelado',
      template: 'cancellation',
      context: {
        user_name: user.name,
        provider_name: name,
        date: date,
      },
    })
  }
}

module.exports = new CancellationMail()
