const { getLotteryTicketInlineKeyboard } = require('../../utils/getKeyboards')
const { pickUpLotteryTicket } = require('../../../utils/toolsForDatabaseWork')
const { callbacks: { erase } } = require('../../constants/inlineKeyboards')
const LotteryTicket = require('../../../db/models/LotteryTicket')
const { getCookiesForLotteryTicket } = require('../../utils')
const { getUserInfoFromCtx } = require('../../../utils')
const { joinDateForMessage } = require('../../../utils')
const systems = require('../../constants/systems')
const { convertTime } = require('../../../utils')
const User = require('../../../db/models/User')
const { Markup } = require('telegraf')

const getLotteryTicket = async (ctx) => {
  const userInfoFromCtx = getUserInfoFromCtx(ctx)

  const dataUser = await User.findOne({ id: userInfoFromCtx.id })

  if (dataUser.lottery_ticket > 0) {
    const lotteryTicket = await LotteryTicket.create({
      prize: getCookiesForLotteryTicket(),
      user: dataUser._id
    })

    await pickUpLotteryTicket(dataUser.id)

    const inlineKeyboardReply = getLotteryTicketInlineKeyboard(erase.text, lotteryTicket.id)

    await ctx.reply(
      `Лотерейный билет № ${lotteryTicket.id}. \n\nРазыгрывается до 20 🥠 \n\nСотри защитный слой и узнай свой выигрыш 🎁`,
      Markup.inlineKeyboard(inlineKeyboardReply)
    )
  } else {
    const timeBeforeAccrualLotteryTicket = convertTime(dataUser.last_erase + systems.freeLotteryTicketInterval)
    await ctx.reply(
      `Вы можете получить свой билет через ${joinDateForMessage(timeBeforeAccrualLotteryTicket)}`
    )
  }
}

module.exports = getLotteryTicket
