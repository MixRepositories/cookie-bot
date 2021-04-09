const { updateStatusLotteryTicket } = require('../../../utils/toolsForDatabaseWork')
const { addCookiesToUser } = require('../../../utils/toolsForDatabaseWork')
const { getUserDataById } = require('../../../utils/toolsForDatabaseWork')
const { getDataTicket } = require('../../../utils/toolsForDatabaseWork')
const { getUserInfoFromCtx } = require('../../../utils')
const { callbacks: { erase } } = require('../../constants/inlineKeyboards')
const { Markup } = require('telegraf')

const eraseTicket = async ({ ctx, params }) => {
  const userInfoFromCtx = getUserInfoFromCtx(ctx)
  const userData = await getUserDataById(userInfoFromCtx.id)
  const dataTicket = await getDataTicket(params?.ticket, userData._id)

  if (dataTicket) {
    if (dataTicket.active) {
      await addCookiesToUser(userData.id, dataTicket.prize)
      await updateStatusLotteryTicket(dataTicket.id)
      const inlineKeyboardReply = [
        [
          Markup.button.callback(
              `🎊 Ваш выйгрыш: ${dataTicket.prize} 🥠 🎊`,
              `${erase.action}?ticket=${dataTicket.id}`
          )
        ]
      ]
      await ctx.editMessageReplyMarkup({
        inline_keyboard: inlineKeyboardReply
      })
    } else {
      await ctx.answerCbQuery('Данный билет уже разыгран')
    }
  } else {
    await ctx.answerCbQuery('Этот билет принадлежит не вам')
  }
}

module.exports = eraseTicket
