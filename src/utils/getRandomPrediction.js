const Prediction = require('../models/Prediction')
const { randomInt } = require('./utils')

const getRandomPrediction = async () => {
  const countPredictions = await Prediction.count()
  const randomIndexPrediction = randomInt(0, countPredictions)
  const predictions = await Prediction.find()
  return predictions[randomIndexPrediction]
}

module.exports = getRandomPrediction
