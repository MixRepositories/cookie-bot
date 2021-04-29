const { crush, balance, lotteryTicket } = require('../../constants/keyboards.js')
const provideCategoriesForSelection = require('./provideCategoriesForSelection')
const getLotteryTicket = require('./getLotteryTicket')
const findOutBalance = require('./findOutBalance')

const messagesRouter = async (ctx) => {
  switch (ctx.update.message.text) {
    case crush.text:
      await provideCategoriesForSelection(ctx)
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
