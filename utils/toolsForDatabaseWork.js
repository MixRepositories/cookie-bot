const User = require('../models/User.js')
const Prediction = require('../models/Prediction')
const Language = require('../models/Language')
const { randomInt } = require('./index')

const updateUserData = async userInfo => {
  const langCode = await Language.findOne({ code: userInfo?.language_code })

  return User.updateOne({ id: userInfo?.id }, {
    first_name: userInfo?.first_name,
    last_name: userInfo?.last_name,
    username: userInfo?.username,
    is_bot: userInfo?.is_bot,
    language_code: langCode?._id
  })
}

const pickUpCookies = (userId, count) => {
  return User.updateOne({ id: userId },
    {
      $inc: { cookies: -count },
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

module.exports = {
  getRandomPrediction,
  updateUserData,
  canCrushCookie,
  pickUpCookies
}
