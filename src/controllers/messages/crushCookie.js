const canCrushCookie = require('../../utils/canCrushCookie.js')
const prices = require('../../constants/prices.js')
const errors = require('../../constants/errors.js')
const getRandomPrediction = require('../../utils/getRandomPrediction')
const pickUpCookies = require('../../utils/pickUpCookies')
const AddTextInImage = require('../../workers/AddTextInImage')
const { getUserInfoFromCtx } = require('../../utils/utils')
const fs = require('fs')
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

      await ctx.replyWithPhoto({ source: fs.readFileSync(urlImageCookieWithPrediction) })
      await ctx.reply(
        'Сдедующая печенька будуте доступна через ЧЧ:ММ \n\nА пока поделись с друзьями!',
        Markup.inlineKeyboard([
          [
            Markup.button.callback('👎', 'badPrediction'),
            Markup.button.callback('👍', 'goodPrediction')
          ],
          [
            Markup.button.callback('Поделиться', 'send')
          ]
        ])
      )
    } else {
      ctx.reply(errors.common)
    }
  } else {
    await ctx.reply(errors.cannotCrush('00:00:36'))
  }
}

module.exports = crushCookie
