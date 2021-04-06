const User = require('../../db/models/User')

exports.normalizeCrushCookies = async (req, res) => {
  await User.updateMany({}, { count_crush: 1 })
  res.send({ method: 'GET', status: 'ok', api: '/helpers/normalize-crush-cookies' })
}
