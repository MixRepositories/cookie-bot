const getStandardKeyboard = require('../../utils/getKeyboards')
const User = require('../../db/models/User')
const Bot = require('../../bot')
const Mailing = require('../../db/models/Mailing')

exports.sendPromoMessageAndAddCookies = async (req, res) => {
  const mailingData = await Mailing.findOne({ name: 'newPredictions1617773205712' })
  if (mailingData.active) {
    const { message, count } = req.body
    const bot = new Bot()
    const users = await User.find({})
    const standardKeyBoard = getStandardKeyboard()

    await User.updateMany({}, { $inc: { cookies: count } })

    await Promise.all(users.map(async user => {
      await bot.sendMailing(user.id, message, standardKeyBoard)
    }))

    await Mailing.updateOne({ _id: mailingData._id }, { active: false })

    return res.send({ method: 'GET', status: 'ok', api: '/mailings/send-promo-message' })
  }
  return res.status(412).json('Mailing status doesn\'t active')
}
