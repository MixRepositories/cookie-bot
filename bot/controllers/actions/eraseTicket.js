const { updateStatusLotteryTicket } = require('../../../utils/toolsForDatabaseWork')
const { getLotteryTicketInlineKeyboard } = require('../../utils/getKeyboards')
const { addCookiesToUser } = require('../../../utils/toolsForDatabaseWork')
const { getUserDataById } = require('../../../utils/toolsForDatabaseWork')
const { getDataTicket } = require('../../../utils/toolsForDatabaseWork')
const { getUserInfoFromCtx } = require('../../../utils')

const eraseTicket = async ({ ctx, params }) => {
  const userInfoFromCtx = getUserInfoFromCtx(ctx)
  const userData = await getUserDataById(userInfoFromCtx.id)
  const dataTicket = await getDataTicket(params?.ticket, userData._id)

  if (dataTicket) {
    if (dataTicket.active) {
      await addCookiesToUser(userData.id, dataTicket.prize)
      await updateStatusLotteryTicket(dataTicket.id)
      const inlineKeyboardReply = getLotteryTicketInlineKeyboard(`🎊 Ваш выйгрыш: ${dataTicket.prize} 🥠 🎊`, dataTicket.id)

      await ctx.editMessageReplyMarkup({
        inline_keyboard: inlineKeyboardReply
      })
      await ctx.answerCbQuery('Результат сохранен')
    } else {
      await ctx.answerCbQuery('Данный билет уже разыгран')
    }
  } else {
    await ctx.answerCbQuery('Этот билет принадлежит не вам')
  }
}

module.exports = eraseTicket
