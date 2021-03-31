const { crush, balance, share } = require('../../constants/keyboards.js')
const crushCookie = require('./crushCookie')
const findOutBalance = require('./findOutBalance')

const messagesRouter = async (ctx) => {
  switch (ctx.update.message.text) {
    case crush.text:
      await crushCookie(ctx)
      break
    case balance.text:
      await findOutBalance(ctx)
      break
    case share.text:
      ctx.reply(share)
      break
  }
}

module.exports = messagesRouter
