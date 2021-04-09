const User = require('../../db/models/User')
const config = require('config')
const googleSheetsInit = require('../../utils/googleSheets/googleSheetsInit')
const Prediction = require('../../db/models/Prediction')
const Language = require('../../db/models/Language')
const Mailing = require('../../db/models/Mailing')

exports.normalizeCrushCookies = async (req, res) => {
  await User.updateMany({ last_crush: { $gt: 1 }, count_crush: { $lte: 0 } }, { count_crush: 1 })
  res.send({ method: 'GET', status: 'ok', api: '/helpers/normalize-crush-cookies' })
}

exports.addTextCookies = async (req, res) => {
  const tableId = config.get('googleTables.predictions_GT')
  const sheetUsersId = config.get('googleTables.predictions_GS.texts')
  const table = await googleSheetsInit(tableId)
  const sheet = table.sheetsById[sheetUsersId]

  const rows = await sheet.getRows()

  const { _id } = await Language.findOne({ code: 'ru' })

  const predictions = rows.map(row => {
    return {
      text: row.textPrediction,
      language: _id
    }
  })

  await Prediction.insertMany(predictions)

  res.send({ method: 'GET', status: 'ok', api: '/helpers/add-text-cookies' })
}

exports.backupCopyDatabase = async (req, res) => {
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

  await sheetUsers.setHeaderRow(['id', 'first_name', 'last_name', 'username', 'is_bot', 'first_contact', 'count_crush', 'cookies', 'last_crush'])
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

  res.send({ method: 'GET', status: 'ok', api: '/helpers/backup-copy-database' })
}

exports.restoreBackupCopy = async (req, res) => {
  const tableId = config.get('googleTables.backupCopyDatabase_GT')
  const sheetUsersId = config.get('googleTables.backupCopyDatabase_GS.users')
  const sheetPredictionsId = config.get('googleTables.backupCopyDatabase_GS.predictions')
  const sheetMailingsId = config.get('googleTables.backupCopyDatabase_GS.mailings')

  const table = await googleSheetsInit(tableId)
  const sheetUsers = table.sheetsById[sheetUsersId]
  const sheetPredictions = table.sheetsById[sheetPredictionsId]
  const sheetMailings = table.sheetsById[sheetMailingsId]

  let users = await sheetUsers.getRows()
  const prediction = await sheetPredictions.getRows()
  let mailings = await sheetMailings.getRows()

  users = users.map(user => {
    if (user.is_bot === 'FALSE') {
      user.is_bot = false
    } else if (user.is_bot === 'TRUE') {
      user.is_bot = true
    }
    return user
  })

  mailings = mailings.map(mail => {
    if (mail.active === 'FALSE') {
      mail.active = false
    } else if (mail.active === 'TRUE') {
      mail.active = true
    }
    return mail
  })

  await User.insertMany(users)
  await Prediction.insertMany(prediction)
  await Mailing.insertMany(mailings)

  res.send({ method: 'GET', status: 'ok', api: '/helpers/restore-backup-copy' })
}

// .updateMany({ $set: { field:1 } })
