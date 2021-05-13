const User = require('../../../db/models/User.js')
const { getUserInfoFromCtx } = require('../../../utils')
const { declOfNumCookies } = require('../../../utils')
const { getStandardKeyboard } = require('../../utils/getKeyboards')

module.exports = async ctx => {
  const userInfo = getUserInfoFromCtx(ctx)
  const dataUserFromDatabase = await User.findOne({
    id: userInfo?.id
  })
  const standardKeyBoard = getStandardKeyboard()

  await ctx.reply(
      `Добро пожаловать в лавку "Счастливое печенье", ${userInfo?.first_name}!\n\nЧтобы получить предсказание нажми "Разломить" 🧝\n\nСейчас у тебя есть ${declOfNumCookies(dataUserFromDatabase.cookies)}`,
      standardKeyBoard
  )
}
