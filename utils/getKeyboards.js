const { Markup } = require('telegraf')
const { balance, lotteryTicket, crush } = require('../bot/constants/keyboards')

const getStandardKeyboard = () => {
  return Markup.keyboard([
    [
      Markup.button.text(crush.text)
    ],
    [
      Markup.button.text(balance.text)
    ],
    [
      Markup.button.text(lotteryTicket.text)
    ]
  ]).resize()
}

module.exports = getStandardKeyboard
