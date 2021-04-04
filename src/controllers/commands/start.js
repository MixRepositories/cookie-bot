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
    await ctx.reply(`Добро пожаловать ${userInfo?.first_name}! \nРазломи печеньку и узнай свое предсказание на день 🧝`)
  }

  const standardKeyBoard = getStandardKeyboard()

  if (await canCrushCookie(userInfo.id, prices.standard)) {
    await ctx.reply(
      `У тебя есть ${dataUserFromDatabase.cookies} печенька`, standardKeyBoard
    )
  } else {
    const timeBeforeAccrual = convertTime(dataUserFromDatabase.last_crush + workers.freeCookieAccrualInterval)
    await ctx.reply(errors.cannotCrush(timeBeforeAccrual.join(':')), standardKeyBoard)
  }
}
