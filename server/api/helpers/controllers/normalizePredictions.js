const Prediction = require('../../../../db/models/Prediction')
const CategoryPrediction = require('../../../../db/models/CategoryPrediction')

const normalizePredictions = async (req, res) => {
  const category = await CategoryPrediction.findOne({ code: 'main' })
  await Prediction.updateMany({}, { $set: { category: category._id } })
  res.send({ method: 'GET', status: 'ok', api: req.url })
}

module.exports = normalizePredictions
