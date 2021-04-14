const googleSheetsInit = require('../../../../utils/googleSheets/googleSheetsInit')
const Prediction = require('../../../../db/models/Prediction')
const Mailing = require('../../../../db/models/Mailing')
const User = require('../../../../db/models/User')
const config = require('config')

/**
 * Создает бэкап в гугл таблице
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
const backupCopyDatabase = async (req, res) => {
  const tableId = config.get('googleTables.backupCopyDatabase_GT')
  const sheetUsersId = config.get('googleTables.backupCopyDatabase_GS.users')
  const sheetPredictionsId = config.get('googleTables.backupCopyDatabase_GS.predictions')
  const sheetMailingsId = config.get('googleTables.backupCopyDatabase_GS.mailings')

  const table = await googleSheetsInit(tableId)
  const sheetUsers = table.sheetsById[sheetUsersId]
  const sheetPredictions = table.sheetsById[sheetPredictionsId]
  const sheetMailings = table.sheetsById[sheetMailingsId]

  await sheetUsers.clear()
  await sheetPredictions.clear()
  await sheetMailings.clear()

  await sheetUsers.setHeaderRow(['status', 'username', 'id', 'first_contact', 'cookies', 'count_crush', 'last_crush', 'lottery_ticket', 'count_erase', 'last_erase'])
  await sheetPredictions.setHeaderRow(['text'])
  await sheetMailings.setHeaderRow(['name', 'active'])

  const users = await User.find({})
  const predictions = await Prediction.find({})
  const mailings = await Mailing.find({})

  try {
    await sheetUsers.addRows(users)
    await sheetPredictions.addRows(predictions)
    await sheetMailings.addRows(mailings)
  } catch (e) {
    console.log(e)
  }

  res.send({ method: 'GET', status: 'ok', api: req.url })
}

module.exports = backupCopyDatabase
