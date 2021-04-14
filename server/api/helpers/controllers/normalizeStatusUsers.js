const User = require('../../../../db/models/User')

const normalizeStatusUsers = async (req, res) => {
  await User.updateMany({}, { $set: { status: true } })
  res.send({ method: 'GET', status: 'ok', api: req.url })
}

module.exports = normalizeStatusUsers
