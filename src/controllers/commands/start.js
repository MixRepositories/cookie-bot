const User = require('../../models/User.js')
const canCrushCookie = require('../../utils/canCrushCookie.js')
const errors = require('../../constants/errors')
const { getUserInfoFromCtx } = require('../../utils/utils')
const { crush, balance, share } = require('../../constants/keyboards.js')
const prices = require('../../constants/prices.js')
const workers = require('../../constants/workers')
const { convertTime } = require('../../utils/utils')
const { Markup } = require('telegraf')

module.exports = async ctx => {
  const userInfo = getUserInfoFromCtx(ctx)
  const dataUserFromDatabase = await User.findOne({
    id: userInfo?.id
  })

  if (ctx.isNewUser) {
    await ctx.reply('!!!WELCOME in our game!!! \nYou can crush cookie and get preparation')
  }

  if (await canCrushCookie(userInfo.id, prices.standard)) {
    const keyboard = Markup.keyboard([
      [
        Markup.button.text(crush.text)
      ],
      [
        Markup.button.text(balance.text),
        Markup.button.text(share.text)
      ]
    ]).resize()

    await ctx.reply(
      `You have ${dataUserFromDatabase.cookies} cookie${dataUserFromDatabase.cookies > 1 ? 's' : ''}`, keyboard
    )
  } else {
    const timeBeforeAccrual = convertTime(dataUserFromDatabase.last_crush + workers.freeCookieAccrualInterval)
    await ctx.reply(errors.cannotCrush(timeBeforeAccrual.join(':')))
  }
}
