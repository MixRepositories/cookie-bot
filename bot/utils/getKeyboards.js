const { callbacks: { dislike, like, erase }, switches: { share } } = require('../constants/inlineKeyboards')
const { balance, lotteryTicket, crush } = require('../constants/keyboards')
const inlineKeyboards = require('../constants/inlineKeyboards')
const prices = require('../constants/prices')
const _chunk = require('lodash/chunk')
const { Markup } = require('telegraf')

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

const getPredictionInlineKeyboard = (idPrediction) => {
  const paramsForCallback = `idPrediction=${idPrediction}`

  return Markup.inlineKeyboard([
    [
      Markup.button.callback(
        dislike.text,
        `${dislike.action}?${paramsForCallback}&effect=dislikes`
      ),
      Markup.button.callback(
        like.text,
        `${like.action}?${paramsForCallback}&effect=likes`
      )
    ],
    [
      Markup.button.switchToChat(share.text, share.message)
    ]
  ])
}

const getLotteryTicketInlineKeyboard = (text, idTicket) => {
  return [
    [
      Markup.button.callback(
        text,
        `${erase.action}?ticket=${idTicket}`
      )
    ]
  ]
}

const getCategoriesPredictionInlineKeyboard = () => {
  return Markup.inlineKeyboard(
    _chunk(inlineKeyboards.categoriesPredictions(prices).map(elem => (
      Markup.button.callback(
        elem.text,
        elem.action
      )
    )), 2)
  )
}

const getKeyboardForMailing = ({ buttonsType, collectionName }) => {
  switch (buttonsType) {
    case 'keyboard':
      switch (collectionName) {
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
  getCategoriesPredictionInlineKeyboard,
  getLotteryTicketInlineKeyboard,
  getPredictionInlineKeyboard,
  getKeyboardForMailing,
  getStandardKeyboard
}
