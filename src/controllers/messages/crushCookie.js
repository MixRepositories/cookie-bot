const canCrushCookie = require('../../utils/canCrushCookie.js')
const prices = require('../../constants/prices.js')
const errors = require('../../constants/errors.js')
const getRandomPrediction = require('../../utils/getRandomPrediction')
const pickUpCookies = require('../../utils/pickUpCookies')
const AddTextInImage = require('../../workers/AddTextInImage')
const { getUserInfoFromCtx } = require('../../utils/utils')
const fs = require('fs')
const { callbacks: { dislike, like, share } } = require('../../constants/inlineKeyboards')
const { Markup } = require('telegraf')

const crushCookie = async ctx => {
  const userInfo = getUserInfoFromCtx(ctx)
  const price = prices.standard
  if (await canCrushCookie(userInfo.id, price)) {
    const resultPickUpCookies = await pickUpCookies(userInfo.id, price)

    if (resultPickUpCookies.ok === 1) {
      const prediction = await getRandomPrediction()

      const imageCookieWithPrediction = new AddTextInImage(prediction.text)
      const urlImageCookieWithPrediction = imageCookieWithPrediction.pathToPicture

      const inlineKeyboardReplyWithPhoto = Markup.inlineKeyboard([
        [
          Markup.button.callback(dislike.text, dislike.action),
          Markup.button.callback(like.text, like.action)
        ],
        [
          Markup.button.callback(share.text, share.action)
        ]
      ])

      await ctx.replyWithPhoto(
        { source: fs.readFileSync(urlImageCookieWithPrediction) }, inlineKeyboardReplyWithPhoto
      )
    } else {
      ctx.reply(errors.common)
    }
  } else {
    await ctx.reply(errors.cannotCrush('00:00:36'))
  }
}

module.exports = crushCookie
