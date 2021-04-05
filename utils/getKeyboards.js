const { Markup } = require('telegraf')
const { balance } = require('../bot/constants/keyboards')
const { crush } = require('../bot/constants/keyboards')

const getStandardKeyboard = () => {
  return Markup.keyboard([
    [
      Markup.button.text(crush.text)
    ],
    [
      Markup.button.text(balance.text)
    ]
  ]).resize()
}

module.exports = getStandardKeyboard
