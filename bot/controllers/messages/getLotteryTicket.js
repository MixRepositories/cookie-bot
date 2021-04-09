const LotteryTicket = require('../../../db/models/LotteryTicket')
const User = require('../../../db/models/User')
const systems = require('../../constants/systems')
const { convertTime } = require('../../../utils')
const { joinDateForMessage } = require('../../../utils')
const { pickUpLotteryTicket } = require('../../../utils/toolsForDatabaseWork')
const { randomInt } = require('../../../utils')
const { getUserInfoFromCtx } = require('../../../utils')
const { Markup } = require('telegraf')
const { callbacks: { erase } } = require('../../constants/inlineKeyboards')

const getLotteryTicket = async (ctx) => {
  const userInfoFromCtx = getUserInfoFromCtx(ctx)

  const dataUser = await User.findOne({ id: userInfoFromCtx.id })

  if (dataUser.lottery_ticket > 0) {
    const lotteryTicket = await LotteryTicket.create({
      prize: randomInt(3, 20),
      user: dataUser._id
    })

    await pickUpLotteryTicket(dataUser.id)

    const inlineKeyboardReply = Markup.inlineKeyboard([
      [
        Markup.button.callback(
          `${erase.text}`,
          `${erase.action}?ticket=${lotteryTicket.id}`
        )
      ]
    ])

    await ctx.reply(
      `Лотерейный билет № ${lotteryTicket.id}. \n\nРозыгрывается до 20 🥠 \n\nСотри защитный слой и узнай свой выигрыш 🎁`,
      inlineKeyboardReply
    )
  } else {
    const timeBeforeAccrualLotteryTicket = convertTime(dataUser.last_erase + systems.freeLotteryTicketInterval)
    await ctx.reply(
      `Вы можете получить свой билет через ${joinDateForMessage(timeBeforeAccrualLotteryTicket)}`
    )
  }
}

module.exports = getLotteryTicket
