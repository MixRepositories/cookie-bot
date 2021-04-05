const User = require('../../db/models/User')
const Language = require('../../db/models/Language')
const { updateUserData } = require('../../utils/toolsForDatabaseWork')
const { getUserInfoFromCtx } = require('../../utils')

const userInitialization = async (ctx, next) => {
  const userInfo = getUserInfoFromCtx(ctx)
  const dateContact = ctx.update.message?.date * 1000
  const langCode = await Language.findOne({ code: userInfo?.language_code })

  try {
    await User.create({
      id: userInfo?.id,
      first_name: userInfo?.first_name,
      last_name: userInfo?.last_name,
      username: userInfo?.username,
      is_bot: userInfo?.is_bot,
      language_code: langCode?._id,
      first_contact: dateContact
    })
    ctx.isNewUser = true
  } catch (e) {
    await updateUserData(userInfo)
  }

  next()
}

module.exports = userInitialization
