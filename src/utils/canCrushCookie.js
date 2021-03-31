const User = require('../models/User.js')

const canCrushCookie = async (userId, price) => {
  const fondDataUser = await User.findOne({
    id: userId
  })
  return fondDataUser.cookies >= price
}

module.exports = canCrushCookie
