const User = require('../models/User.js')

const pickUpCookies = (userId, count) => {
  return User.updateOne({ id: userId },
    {
      $inc: { cookies: -count },
      last_crush: Date.now()
    }
  )
}

module.exports = pickUpCookies
