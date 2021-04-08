const Prediction = require('../../../db/models/Prediction')
const User = require('../../../db/models/User')
const { getUserInfoFromCtx } = require('../../../utils')
const { Markup } = require('telegraf')
const { callbacks: { dislike, like }, switches: { share } } = require('../../constants/inlineKeyboards')

const ratePrediction = async ({ ctx, params, likes, dislikes }) => {
  const userInfo = getUserInfoFromCtx(ctx)
  const userData = await User.findOne({ id: userInfo.id })
  let prediction = await Prediction.findOne(
    { _id: params.idPrediction, usersRated: userData._id }
  )

  if (!prediction) {
    await Prediction.updateOne(
      { _id: params.idPrediction },
      {
        $addToSet: { usersRated: userData._id },
        $inc: { likes: likes, dislikes: dislikes }
      }
    )

    prediction = await Prediction.findOne(
      { _id: params.idPrediction, usersRated: userData._id }
    )

    const paramsForCallback = `idPrediction=${params.idPrediction}`

    const inlineKeyboardReplyWithPhoto = [
      [
        Markup.button.callback(
          `${dislike.text} ${prediction.dislikes}`,
          `${dislike.action}?${paramsForCallback}&effect=dislikes`
        ),
        Markup.button.callback(
          `${like.text} ${prediction.likes}`,
          `${like.action}?${paramsForCallback}&effect=likes`
        )
      ],
      [
        Markup.button.switchToChat(share.text, share.message)
      ]
    ]

    await ctx.editMessageReplyMarkup({
      inline_keyboard: inlineKeyboardReplyWithPhoto
    })
    await ctx.answerCbQuery('')

    await ctx.answerCbQuery('Ваше оценка принята')
  } else {
    await ctx.answerCbQuery('Вы оценивали ранее')
  }
}

module.exports = ratePrediction
