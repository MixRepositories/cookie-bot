const User = require('../../../db/models/User')
const systems = require('../../constants/systems')
const { joinDateForMessage } = require('../../../utils')
const { convertTime } = require('../../../utils')
const { getUserInfoFromCtx } = require('../../../utils')

const findOutBalance = async (ctx) => {
  const userInfoFromCtx = getUserInfoFromCtx(ctx)
  const dataUserFromDatabase = await User.findOne({ id: userInfoFromCtx.id })
  const countCookies = dataUserFromDatabase.cookies
  const lotteryTickets = dataUserFromDatabase.lottery_ticket

  const timeBeforeAccrualCookie = convertTime(dataUserFromDatabase.last_crush + systems.freeCookieAccrualInterval)
  const timeBeforeAccrualLotteryTicket = convertTime(dataUserFromDatabase.last_erase + systems.freeLotteryTicketInterval)

  await ctx.reply(
    `Ваш баланс: \nПеченьки - ${countCookies} 🥠 \nЛотерейные билеты - ${lotteryTickets} 🎫 \n\n` +
   `${countCookies < 1 ? `\nЧерез ${joinDateForMessage(timeBeforeAccrualCookie)} будет начислена бесплатная печенька 🤗\n` : ''}` +
   `${lotteryTickets < 1 ? `\nЧерез ${joinDateForMessage(timeBeforeAccrualLotteryTicket)} будет начислен бесплатный лотерейный билет 🥳` : ''}`
  )
}

module.exports = findOutBalance
