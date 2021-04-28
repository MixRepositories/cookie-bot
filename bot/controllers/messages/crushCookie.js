const { getPredictionInlineKeyboard } = require('../../utils/getKeyboards')
const AddTextOnImage = require('../../workers/AddTextOnImage')
const { getUserInfoFromCtx } = require('../../../utils')
const prices = require('../../constants/prices.js')
const errors = require('../../constants/errors.js')
const systems = require('../../constants/systems')
const {
  getRandomPrediction, canCrushCookie, pickUpCookies
} = require('../../../utils/toolsForDatabaseWork')
const { convertTime } = require('../../../utils')
const User = require('../../../db/models/User')
const fs = require('fs')

const crushCookie = async ctx => {
  const userInfo = getUserInfoFromCtx(ctx)
  const price = prices.standard.price
  if (await canCrushCookie(userInfo.id, price)) {
    const resultPickUpCookies = await pickUpCookies(userInfo.id, price)

    if (resultPickUpCookies.ok === 1) {
      const prediction = await getRandomPrediction()

      const imageCookieWithPrediction = new AddTextOnImage(prediction.text)
      const urlImageCookieWithPrediction = imageCookieWithPrediction.pathToPicture

      const inlineKeyboardReplyWithPhoto = getPredictionInlineKeyboard(prediction._id)

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
