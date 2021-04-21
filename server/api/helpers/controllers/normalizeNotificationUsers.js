const User = require('../../../../db/models/User')

const normalizeNotificationUsers = async (req, res) => {
  await User.updateMany({}, {
    $set: {
      firstNotification: false,
      secondNotification: false,
      thirdNotification: false,
      fourthNotification: false,
      endNotification: false
    }
  })

  res.send({ method: 'GET', status: 'ok', api: req.url })
}

module.exports = normalizeNotificationUsers
