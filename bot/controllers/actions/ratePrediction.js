const Prediction = require('../../../db/models/Prediction')
const { getUserInfoFromCtx } = require('../../../utils')
const User = require('../../../db/models/User')

const ratePrediction = async ({ ctx, params, likes, dislikes }) => {
  const userInfo = getUserInfoFromCtx(ctx)
  const userData = await User.findOne({ id: userInfo.id })
  const prediction = await Prediction.findOne(
    { _id: params.idPrediction, users_rated: userData._id }
  )

  if (!prediction) {
    await Prediction.updateOne(
      { _id: params.idPrediction },
      {
        $addToSet: { users_rated: userData._id },
        $inc: { likes: likes, dislikes: dislikes }
      }
    )

    await ctx.answerCbQuery('Ваше оценка принята')
  } else {
    await ctx.answerCbQuery('Вы оценивали ранее')
  }
}

module.exports = ratePrediction
