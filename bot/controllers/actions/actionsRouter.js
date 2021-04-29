const { callbacks: { dislike, like, erase, crush } } = require('../../constants/inlineKeyboards')
const { parseQueryCallback } = require('../../../utils')
const ratePrediction = require('./ratePrediction')
const eraseTicket = require('./eraseTicket')
const crushCookie = require('./crushCookie')

const actionsRouter = async ctx => {
  const { action, params } = parseQueryCallback(ctx.match[0])
  switch (action) {
    case dislike.action:
      await ratePrediction({ ctx, params, likes: 0, dislikes: 1 })
      break
    case like.action:
      await ratePrediction({ ctx, params, likes: 1, dislikes: 0 })
      break
    case erase.action:
      await eraseTicket({ ctx, params })
      break
    case crush.action:
      await crushCookie({ ctx, params })
      break
  }
}

module.exports = actionsRouter
