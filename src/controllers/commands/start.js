const User = require('../../models/User.js')
const errors = require('../../constants/errors')
const { getUserInfoFromCtx } = require('../../utils')
const prices = require('../../constants/prices.js')
const workers = require('../../constants/workers')
const getStandardKeyboard = require('../../utils/getKeyboards')
const { canCrushCookie } = require('../../utils/toolsForDatabaseWork')
const { convertTime } = require('../../utils')

module.exports = async ctx => {
  const userInfo = getUserInfoFromCtx(ctx)
  const dataUserFromDatabase = await User.findOne({
    id: userInfo?.id
  })

  if (ctx.isNewUser) {
    await ctx.reply('!!!WELCOME in our game!!! \nYou can crush cookie and get preparation')
  }

  if (await canCrushCookie(userInfo.id, prices.standard)) {
    const standardKeyBoard = getStandardKeyboard()

    await ctx.reply(
      `You have ${dataUserFromDatabase.cookies} cookie${dataUserFromDatabase.cookies > 1 ? 's' : ''}`, standardKeyBoard
    )
  } else {
    const timeBeforeAccrual = convertTime(dataUserFromDatabase.last_crush + workers.freeCookieAccrualInterval)
    await ctx.reply(errors.cannotCrush(timeBeforeAccrual.join(':')))
  }
}
