const User = require('../../models/User.js')
const canCrushCookie = require('../../utils/canCrushCookie.js')
const updateUserData = require('../../utils/updateUserData.js')
const errors = require('../../constants/errors')
const { getUserInfoFromCtx } = require('../../utils/utils')
const { crush, balance, share } = require('../../constants/keyboards.js')
const prices = require('../../constants/prices.js')
const { Markup } = require('telegraf')

module.exports = async ctx => {
  const userInfo = getUserInfoFromCtx(ctx)
  const dateContact = ctx.update.message.date * 1000

  let fondDataUser
  try {
    fondDataUser = await User.create({
      id: userInfo?.id,
      first_name: userInfo?.first_name,
      username: userInfo?.username,
      is_bot: userInfo?.is_bot,
      language_code: userInfo?.language_code,
      first_contact: dateContact
    })

    await ctx.reply('!!!WELCOME in our game!!! \nYou can crush cookie and get preparation')
  } catch (e) {
    await updateUserData(userInfo)
    fondDataUser = await User.findOne({
      id: userInfo?.id
    })
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
    ])

    await ctx.reply(
      `You have ${fondDataUser.cookies} cookie${fondDataUser.cookies > 1 ? 's' : ''}`, keyboard
    )
  } else {
    await ctx.reply(errors.cannotCrush('00:00:36'))
  }
}
