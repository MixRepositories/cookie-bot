const User = require('../../models/User')
const { getCaseCookies, getUserInfoFromCtx } = require('../../utils')

const findOutBalance = async (ctx) => {
  const userInfoFromCtx = getUserInfoFromCtx(ctx)
  const userDataFromDB = await User.findOne({ id: userInfoFromCtx.id })
  const countCookies = userDataFromDB.cookies
  await ctx.reply(`У вас ${countCookies} ${getCaseCookies(countCookies)}`)
}

module.exports = findOutBalance
