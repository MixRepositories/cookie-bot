const whatToDo = require('../../../../assets/predictions/whatToDo.json')
const future = require('../../../../assets/predictions/future.json')
const money = require('../../../../assets/predictions/money.json')
const main = require('../../../../assets/predictions/main.json')
const love = require('../../../../assets/predictions/love.json')
const work = require('../../../../assets/predictions/work.json')

const Language = require('../../../../db/models/Language')
const Prediction = require('../../../../db/models/Prediction')
const CategoryPrediction = require('../../../../db/models/CategoryPrediction')

const upgradePredictionsForSendInDb = async (data, categoryCode) => {
  const language = await Language.findOne({ code: 'ru' })
  const categoryPrediction = await CategoryPrediction.findOne({ code: categoryCode })

  data = data.map(elem => {
    elem.language = language._id
    elem.category = categoryPrediction._id
    return elem
  })
  return data
}

const addNewPredictionsByCategories = async (req, res) => {
  try {
    const result = await Promise.all([
      ...await upgradePredictionsForSendInDb(whatToDo, 'whatToDo'),
      ...await upgradePredictionsForSendInDb(future, 'future'),
      ...await upgradePredictionsForSendInDb(money, 'money'),
      ...await upgradePredictionsForSendInDb(main, 'main'),
      ...await upgradePredictionsForSendInDb(love, 'love'),
      ...await upgradePredictionsForSendInDb(work, 'work')
    ])
    await Prediction.create(result)
    res.send({ method: 'GET', status: 'ok', api: req.url })
  } catch (e) {
    res.status(500).send(e)
  }
}

module.exports = addNewPredictionsByCategories
