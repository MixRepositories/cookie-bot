const User = require('../../db/models/User')

exports.normalizeCrushCookies = async (req, res) => {
  await User.updateMany({ last_crush: { $gt: 1 }, count_crush: { $lte: 0 } }, { count_crush: 1 })
  res.send({ method: 'GET', status: 'ok', api: '/helpers/normalize-crush-cookies' })
}
