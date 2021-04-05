const ratePrediction = require('./ratePrediction')
const { parseQueryCallback } = require('../../../utils')
const { callbacks: { dislike, like } } = require('../../constants/inlineKeyboards')

const actionsRouter = async ctx => {
  const { action, params } = parseQueryCallback(ctx.match[0])
  switch (action) {
    case dislike.action:
      await ratePrediction({ ctx, params, likes: 0, dislikes: 1 })
      break
    case like.action:
      await ratePrediction({ ctx, params, likes: 1, dislikes: 0 })
      break
  }
}

module.exports = actionsRouter
