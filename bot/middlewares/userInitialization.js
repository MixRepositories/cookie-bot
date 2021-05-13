const User = require('../../db/models/User')
const Language = require('../../db/models/Language')
const { updateUserData } = require('../../utils/toolsForDatabaseWork')
const { getUserInfoFromCtx } = require('../../utils')

const userInitialization = async (ctx, next) => {
  const userInfo = getUserInfoFromCtx(ctx)
  const langCode = await Language.findOne({ code: userInfo?.language_code })
  try {
    console.log('try')
    await User.create({
      id: userInfo?.id,
      first_name: userInfo?.first_name,
      last_name: userInfo?.last_name,
      username: userInfo?.username,
      is_bot: userInfo?.is_bot,
      language_code: langCode?._id,
      last_sign_in: Date.now()
    })
    ctx.isNewUser = true
  } catch (e) {
    console.log('error')
    await updateUserData(userInfo)
  }

  next()
}

module.exports = userInitialization
