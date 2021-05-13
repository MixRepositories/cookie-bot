const User = require('../../../db/models/User.js')
const errors = require('../../constants/errors')
const { getUserInfoFromCtx } = require('../../../utils')
const prices = require('../../constants/prices.js')
const systems = require('../../constants/systems')
const { declOfNumCookies } = require('../../../utils')
const { getStandardKeyboard } = require('../../utils/getKeyboards')
const { canCrushCookie } = require('../../../utils/toolsForDatabaseWork')
const { convertTime } = require('../../../utils')

module.exports = async ctx => {
  const userInfo = getUserInfoFromCtx(ctx)
  const dataUserFromDatabase = await User.findOne({
    id: userInfo?.id
  })
  const standardKeyBoard = getStandardKeyboard()

  if (ctx.isNewUser) {
    await ctx.reply(
      `Добро пожаловать ${userInfo?.first_name}!\nРазломи печеньку и узнай свое предсказание на день 🧝\n\nСейчас у тебя есть ${declOfNumCookies(dataUserFromDatabase.cookies)}`,
      standardKeyBoard
    )
  } else {
    if (await canCrushCookie(userInfo.id, prices.main.price)) {
      await ctx.reply(`Сейчас у тебя есть ${declOfNumCookies(dataUserFromDatabase.cookies)}`, standardKeyBoard)
    } else {
      const timeBeforeAccrual = convertTime(dataUserFromDatabase.last_crush + systems.freeCookieAccrualInterval)
      await ctx.reply(errors.cannotCrush(timeBeforeAccrual.join(':')), standardKeyBoard)
    }
  }
}
