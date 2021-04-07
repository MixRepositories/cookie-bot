const config = require('config')
const googleSheetsInit = require('../../utils/googleSheets/googleSheetsInit')
const Prediction = require('../../db/models/Prediction')
const User = require('../../db/models/User')
const { updateSheets } = require('../../utils/googleSheets/analytics/analytics')
const moment = require('moment')

exports.updateAll = async (req, res) => {
  const tableId = config.get('googleTables.analytics_GT')
  const sheetUsersId = config.get('googleTables.analytics_GS.users')
  const sheetPredictionsId = config.get('googleTables.analytics_GS.predictions')

  const table = await googleSheetsInit(tableId)

  const sheetUser = table.sheetsById[sheetUsersId]

  let dataUsers = await User.find({})

  dataUsers = dataUsers.map(user => {
    user = user.toObject()
    user.first_contact = moment.utc(user.first_contact).format()
    user.last_crush = moment.utc(user.last_crush).format()
    return user
  })

  const headerUsers = ['ObjectId', 'tgId', 'languageCode', 'firstContact', 'lastCrush', 'countCrush']
  const sourceUsers = ['_id', 'id', 'language_code', 'first_contact', 'last_crush', 'count_crush']
  await updateSheets(sheetUser, headerUsers, sourceUsers, dataUsers)

  const sheetPredictions = table.sheetsById[sheetPredictionsId]
  const dataPredictions = await Prediction.find({})
  const headerPredictions = ['ObjectId', 'likes', 'dislikes']
  const sourcePredictions = ['_id', 'likes', 'dislikes']
  await updateSheets(sheetPredictions, headerPredictions, sourcePredictions, dataPredictions)

  res.send({ method: 'GET', status: 'ok', api: '/analytics/update-all' })
}
