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

const getKeyboardForMailing = ({ type, name }) => {
  switch (type) {
    case 'keyboard':
      switch (name) {
        case 'standard':
          return getStandardKeyboard()
      }
      break
    case 'inlineKeyboards':
      break
    default:
      return []
  }
}

module.exports = {
  getKeyboardForMailing,
  getStandardKeyboard
}
