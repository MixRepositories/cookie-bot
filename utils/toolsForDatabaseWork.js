const User = require('../db/models/User.js')
const Prediction = require('../db/models/Prediction')
const Language = require('../db/models/Language')
const LotteryTicket = require('../db/models/LotteryTicket')
const { randomInt } = require('./index')

const updateUserData = async userInfo => {
  const langCode = await Language.findOne({ code: userInfo?.language_code })

  return User.updateOne({ id: userInfo?.id }, {
    first_name: userInfo?.first_name,
    last_name: userInfo?.last_name,
    username: userInfo?.username,
    is_bot: userInfo?.is_bot,
    language_code: langCode?._id,
    status: true
  })
}

const pickUpCookies = (userId, count) => {
  return User.updateOne({ id: userId },
    {
      $inc: { cookies: -count, count_crush: 1 },
      last_crush: Date.now()
    }
  )
}

const getRandomPrediction = async () => {
  const countPredictions = await Prediction.count()
  const randomIndexPrediction = randomInt(0, countPredictions)
  const predictions = await Prediction.find()
  return predictions[randomIndexPrediction]
}

const canCrushCookie = async (userId, price) => {
  const fondDataUser = await User.findOne({
    id: userId
  })
  return fondDataUser.cookies >= price
}

const addCookiesToUser = async (id, count) => {
  await User.updateOne({ id }, { $inc: { cookies: count } })
}

const getDataTicket = (ticketId, userId) => {
  return LotteryTicket.findOne({ id: ticketId, user: userId })
}

const getUserDataById = id => {
  return User.findOne({ id })
}

const updateStatusLotteryTicket = async id => {
  await LotteryTicket.updateOne({ id }, { active: false })
}

const pickUpLotteryTicket = async id => {
  await User.updateOne({ id }, {
    $inc: { lottery_ticket: -1, count_erase: 1 },
    last_erase: Date.now()
  })
}

const addLotteryTicketsToUser = async (id, count) => {
  await User.updateOne({ id }, { $inc: { lottery_ticket: count } })
}

module.exports = {
  updateStatusLotteryTicket,
  addLotteryTicketsToUser,
  getRandomPrediction,
  pickUpLotteryTicket,
  addCookiesToUser,
  getUserDataById,
  updateUserData,
  canCrushCookie,
  getDataTicket,
  pickUpCookies
}
