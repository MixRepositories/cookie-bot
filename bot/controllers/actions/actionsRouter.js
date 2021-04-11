const { callbacks: { dislike, like, erase } } = require('../../constants/inlineKeyboards')
const { parseQueryCallback } = require('../../../utils')
const ratePrediction = require('./ratePrediction')
const eraseTicket = require('./eraseTicket')

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
  }
}

module.exports = actionsRouter
