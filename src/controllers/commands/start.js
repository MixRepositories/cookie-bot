const User = require('../../models/User.js')
const canCrushCookie = require('../../utils/canCrushCookie.js')
const errors = require('../../constants/errors')
const { getUserInfoFromCtx } = require('../../utils/utils')
const { crush, balance, share } = require('../../constants/keyboards.js')
const prices = require('../../constants/prices.js')
const { Markup } = require('telegraf')

module.exports = async ctx => {
  const userInfo = getUserInfoFromCtx(ctx)
  const fondDataUser = await User.findOne({
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
      `You have ${fondDataUser.cookies} cookie${fondDataUser.cookies > 1 ? 's' : ''}`, keyboard
    )
  } else {
    await ctx.reply(errors.cannotCrush('00:00:36'))
  }
}
