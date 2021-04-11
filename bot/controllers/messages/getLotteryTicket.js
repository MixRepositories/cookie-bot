const { getLotteryTicketInlineKeyboard } = require('../../utils/getKeyboards')
const { pickUpLotteryTicket } = require('../../../utils/toolsForDatabaseWork')
const LotteryTicket = require('../../../db/models/LotteryTicket')
const { getUserInfoFromCtx } = require('../../../utils')
const { joinDateForMessage } = require('../../../utils')
const systems = require('../../constants/systems')
const { convertTime } = require('../../../utils')
const { randomInt } = require('../../../utils')
const User = require('../../../db/models/User')

const getLotteryTicket = async (ctx) => {
  const userInfoFromCtx = getUserInfoFromCtx(ctx)

  const dataUser = await User.findOne({ id: userInfoFromCtx.id })

  if (dataUser.lottery_ticket > 0) {
    const lotteryTicket = await LotteryTicket.create({
      prize: randomInt(3, 20),
      user: dataUser._id
    })

    await pickUpLotteryTicket(dataUser.id)

    const inlineKeyboardReply = getLotteryTicketInlineKeyboard(lotteryTicket.id)

    await ctx.reply(
      `Лотерейный билет № ${lotteryTicket.id}. \n\nРазыгрывается до 20 🥠 \n\nСотри защитный слой и узнай свой выигрыш 🎁`,
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
