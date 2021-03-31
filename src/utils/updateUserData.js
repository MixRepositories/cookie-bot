const User = require('../models/User.js')

const updateUserData = async userInfo => {
  await User.updateOne({ id: userInfo?.id }, {
    first_name: userInfo?.first_name,
    username: userInfo?.username,
    is_bot: userInfo?.is_bot,
    language_code: userInfo?.language_code
  })
}

module.exports = updateUserData
