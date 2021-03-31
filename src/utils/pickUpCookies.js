const User = require('../models/User.js')

const pickUpCookies = async (userId, count) => {
  const fondDataUser = await User.findOne({
    id: userId
  })
  return User.updateOne({ id: userId }, { cookies: fondDataUser.cookies - count })
}

module.exports = pickUpCookies
