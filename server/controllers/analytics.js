const config = require('config')
const googleSheetsInit = require('../../utils/googleSheets/googleSheetsInit')
const Prediction = require('../../db/models/Prediction')
const User = require('../../db/models/User')
const { updateSheets } = require('../../utils/googleSheets/analytics/analytics')

exports.updateAll = async (req, res) => {
  const tableId = config.get('analytics.googleTable')
  const sheetUsersId = config.get('analytics.googleSheet.users')
  const sheetPredictionsId = config.get('analytics.googleSheet.predictions')

  const table = await googleSheetsInit(tableId)

  const sheetUser = table.sheetsById[sheetUsersId]
  const dataUsers = await User.find({})
  const headerUsers = ['ObjectId', 'tgId', 'languageCode', 'firstContact', 'lastCrush', 'countCrush']
  const sourceUsers = ['_id', 'id', 'language_code', 'first_contact', 'last_crush', 'count_crush']
  await updateSheets(sheetUser, headerUsers, sourceUsers, dataUsers)

  const sheetPredictions = table.sheetsById[sheetPredictionsId]
  const dataPredictions = await Prediction.find({})
  const headerPredictions = ['ObjectId', 'likes', 'dislikes']
  const sourcePredictions = ['_id', 'likes', 'dislikes']
  await updateSheets(sheetPredictions, headerPredictions, sourcePredictions, dataPredictions)

  res.send({ method: 'GET', type: 'all', api: '/analytics/update-all' })
}
