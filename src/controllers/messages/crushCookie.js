const AddTextInImage = require('../../systems/AddTextInImage')
const {
  callbacks: { dislike, like }, switches: { share }
} = require('../../constants/inlineKeyboards')
const { getUserInfoFromCtx } = require('../../utils')
const prices = require('../../constants/prices.js')
const errors = require('../../constants/errors.js')
const systems = require('../../constants/systems')
const {
  getRandomPrediction, canCrushCookie, pickUpCookies
} = require('../../utils/toolsForDatabaseWork')
const { convertTime } = require('../../utils')
const User = require('../../models/User')
const { Markup } = require('telegraf')
const fs = require('fs')

const crushCookie = async ctx => {
  const userInfo = getUserInfoFromCtx(ctx)
  const price = prices.standard
  if (await canCrushCookie(userInfo.id, price)) {
    const resultPickUpCookies = await pickUpCookies(userInfo.id, price)

    if (resultPickUpCookies.ok === 1) {
      const prediction = await getRandomPrediction()

      const imageCookieWithPrediction = new AddTextInImage(prediction.text)
      const urlImageCookieWithPrediction = imageCookieWithPrediction.pathToPicture

      const paramsForCallback = `idPrediction=${prediction._id}`

      const inlineKeyboardReplyWithPhoto = Markup.inlineKeyboard([
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
      ])

      await ctx.replyWithPhoto(
        { source: fs.readFileSync(urlImageCookieWithPrediction) }, inlineKeyboardReplyWithPhoto
      )
    } else {
      ctx.reply(errors.common)
    }
  } else {
    const dataUser = await User.findOne({ id: userInfo.id })
    const timeBeforeAccrual = convertTime(dataUser.last_crush + systems.freeCookieAccrualInterval)
    await ctx.reply(errors.cannotCrush(timeBeforeAccrual.join(':')))
  }
}

module.exports = crushCookie
