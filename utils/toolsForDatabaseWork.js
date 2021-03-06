const User = require('../db/models/User.js')
const Prediction = require('../db/models/Prediction')
const Language = require('../db/models/Language')
const LotteryTicket = require('../db/models/LotteryTicket')
const CategoryPrediction = require('../db/models/CategoryPrediction')
const { randomInt } = require('./index')

const updateUserData = async userInfo => {
  const langCode = await Language.findOne({ code: userInfo?.language_code })

  return User.updateOne({ id: userInfo?.id }, {
    first_name: userInfo?.first_name,
    last_name: userInfo?.last_name,
    username: userInfo?.username,
    language_code: langCode?._id,
    last_sign_in: Date.now(),
    status: true,
    firstNotification: false,
    secondNotification: false,
    thirdNotification: false,
    fourthNotification: false,
    endNotification: false
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

const getRandomPrediction = async (category) => {
  const categoryDoc = await CategoryPrediction.findOne({ code: category })
  const filterForPredictions = { category: categoryDoc.id }
  const countPredictions = await Prediction.count(filterForPredictions)
  const randomIndexPrediction = randomInt(0, countPredictions)
  const predictions = await Prediction.find(filterForPredictions)
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
