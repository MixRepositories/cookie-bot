const User = require('../../../../db/models/User')

const normalizeNotificationUsers = async (req, res) => {
  await User.updateMany({}, {
    $set: {
      firstNotification: false,
      secondNotification: false,
      thirdNotification: false,
      fourthNotification: false,
      endNotification: false,
      last_sign_in: 1_619_270_659_541
    }
  })

  res.send({ method: 'GET', status: 'ok', api: req.url })
}

module.exports = normalizeNotificationUsers
