const { getPredictionInlineKeyboard } = require('../../utils/getKeyboards')
const AddTextOnImage = require('../../workers/AddTextOnImage')
const { getUserInfoFromCtx } = require('../../../utils')
const prices = require('../../constants/prices.js')
const errors = require('../../constants/errors.js')
const {
  getRandomPrediction, canCrushCookie, pickUpCookies
} = require('../../../utils/toolsForDatabaseWork')
const fs = require('fs')

const crushCookie = async ({ ctx, params }) => {
  const userInfo = getUserInfoFromCtx(ctx)
  const price = prices[params.category].price

  if (await canCrushCookie(userInfo.id, price)) {
    const resultPickUpCookies = await pickUpCookies(userInfo.id, price)

    if (resultPickUpCookies.ok === 1) {
      const prediction = await getRandomPrediction(params.category)

      const imageCookieWithPrediction = new AddTextOnImage(prediction.text)
      const urlImageCookieWithPrediction = imageCookieWithPrediction.pathToPicture

      const inlineKeyboardReplyWithPhoto = getPredictionInlineKeyboard(prediction._id)

      await ctx.answerCbQuery('*Хруст*')

      await ctx.replyWithPhoto(
        { source: fs.readFileSync(urlImageCookieWithPrediction) }, inlineKeyboardReplyWithPhoto
      )
    } else {
      await ctx.answerCbQuery(errors.common)
    }
  } else {
    await ctx.answerCbQuery('У вас недостаточно печенек')
  }
}

module.exports = crushCookie
