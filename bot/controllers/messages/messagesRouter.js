const { crush, balance, lotteryTicket } = require('../../constants/keyboards.js')
const crushCookie = require('./crushCookie')
const findOutBalance = require('./findOutBalance')
const getLotteryTicket = require('./getLotteryTicket')

const messagesRouter = async (ctx) => {
  switch (ctx.update.message.text) {
    case crush.text:
      await crushCookie(ctx)
      break
    case balance.text:
      await findOutBalance(ctx)
      break
    case lotteryTicket.text:
      await getLotteryTicket(ctx)
      break
  }
}

module.exports = messagesRouter
