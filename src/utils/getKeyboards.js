const { Markup } = require('telegraf')
const { share } = require('../constants/keyboards')
const { balance } = require('../constants/keyboards')
const { crush } = require('../constants/keyboards')

const getStandardKeyboard = () => {
  return Markup.keyboard([
    [
      Markup.button.text(crush.text)
    ],
    [
      Markup.button.text(balance.text),
      Markup.button.text(share.text)
    ]
  ]).resize()
}

module.exports = getStandardKeyboard
