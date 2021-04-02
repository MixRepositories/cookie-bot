const User = require('../models/User')
const updateUserData = require('../utils/updateUserData')
const { getUserInfoFromCtx } = require('../utils/utils')

const userInitialization = async (ctx, next) => {
  const userInfo = getUserInfoFromCtx(ctx)
  const dateContact = ctx.update.message?.date * 1000
  try {
    await User.create({
      id: userInfo?.id,
      first_name: userInfo?.first_name,
      last_name: userInfo?.last_name,
      username: userInfo?.username,
      is_bot: userInfo?.is_bot,
      language_code: userInfo?.language_code,
      first_contact: dateContact
    })
    ctx.isNewUser = true
  } catch (e) {
    await updateUserData(userInfo)
  }
  next()
}

module.exports = userInitialization
