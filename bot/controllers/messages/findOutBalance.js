const User = require('../../../db/models/User')
const systems = require('../../constants/systems')
const { convertTime } = require('../../../utils')
const { getCaseCookies, getUserInfoFromCtx } = require('../../../utils')

const findOutBalance = async (ctx) => {
  const userInfoFromCtx = getUserInfoFromCtx(ctx)
  const dataUserFromDatabase = await User.findOne({ id: userInfoFromCtx.id })
  const countCookies = dataUserFromDatabase.cookies

  const timeBeforeAccrual = convertTime(dataUserFromDatabase.last_crush + systems.freeCookieAccrualInterval)

  await ctx.reply(`У тебя ${countCookies} ${getCaseCookies(countCookies)} ${countCookies < 1 ? `\nЧерез ${timeBeforeAccrual.join(':')} будет начислена бесплатная печенька🤗` : null}
  `)
}

module.exports = findOutBalance
