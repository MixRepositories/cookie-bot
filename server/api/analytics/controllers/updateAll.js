const { updateSheets } = require('../../../../utils/googleSheets/analytics/analytics')
const googleSheetsInit = require('../../../../utils/googleSheets/googleSheetsInit')
const Prediction = require('../../../../db/models/Prediction')
const User = require('../../../../db/models/User')
const config = require('config')
const moment = require('moment')

const updateAll = async (req, res) => {
  const tableId = config.get('googleTables.analytics_GT')
  const sheetUsersId = config.get('googleTables.analytics_GS.users')
  const sheetPredictionsId = config.get('googleTables.analytics_GS.predictions')

  const table = await googleSheetsInit(tableId)

  const sheetUser = table.sheetsById[sheetUsersId]

  let dataUsers = await User.find({})

  dataUsers = dataUsers.map(user => {
    user = user.toObject()
    const format = 'DD-MM-YYYY'
    user.first_contact = moment.utc(user.first_contact).format(format)
    user.last_sign_in = moment.utc(user.last_sign_in).format(format)
    user.last_crush = moment.utc(user.last_crush).format(format)
    user.last_erase = moment.utc(user.last_erase).format(format)
    return user
  })

  const headerUsers = [
    'status', 'username', '_id', 'id', 'first_contact', 'last_sign_in', 'cookies', 'count_crush',
    'last_crush', 'lottery_ticket', 'count_erase', 'last_erase'
  ]
  await updateSheets(sheetUser, headerUsers, dataUsers)

  const sheetPredictions = table.sheetsById[sheetPredictionsId]
  const dataPredictions = await Prediction.find({})
  const headerPredictions = ['_id', 'likes', 'dislikes']
  await updateSheets(sheetPredictions, headerPredictions, dataPredictions)

  res.send({ method: 'GET', status: 'ok', api: req.url })
}

module.exports = updateAll
