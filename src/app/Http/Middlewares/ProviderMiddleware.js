module.exports = async (request, response, next) => {
  if (request.user.provider) {
    return next()
  }

  return response.status(403).json({ error: 'Unauthorized' })
}
