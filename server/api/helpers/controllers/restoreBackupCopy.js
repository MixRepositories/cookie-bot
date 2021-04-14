const googleSheetsInit = require('../../../../utils/googleSheets/googleSheetsInit')
const Prediction = require('../../../../db/models/Prediction')
const Mailing = require('../../../../db/models/Mailing')
const User = require('../../../../db/models/User')
const config = require('config')

const getRows = (table, configSheetId) => {
  const sheetId = config.get(configSheetId)
  const sheet = table.sheetsById[sheetId]
  return sheet.getRows()
}

const normaliseBooleanType = (array, nameForNormalise) => {
  return array.map(elem => {
    if (elem[nameForNormalise] === 'FALSE') elem.is_bot = false
    else if (elem[nameForNormalise] === 'TRUE') elem.is_bot = true
    return elem
  })
}

/**
 * Обновляет базу данных согласно последнему бэк апу
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
const restoreBackupCopy = async (req, res) => {
  // TODO - добавить токкен для проверки прав
  // TODO 2 - рефакторнуть метод (вынести в 1 функцию работу с листом)
  const tableId = config.get('googleTables.backupCopyDatabase_GT')
  const table = await googleSheetsInit(tableId)

  let users = await getRows(table, 'googleTables.backupCopyDatabase_GS.users')
  const prediction = await getRows(table, 'googleTables.backupCopyDatabase_GS.predictions')
  let mailings = await getRows(table, 'googleTables.backupCopyDatabase_GS.mailings')

  users = normaliseBooleanType(users, 'is_bot')
  users = normaliseBooleanType(users, 'status')

  mailings = normaliseBooleanType(mailings, 'active')

  console.log(users)

  await User.insertMany(users)
  await Prediction.insertMany(prediction)
  await Mailing.insertMany(mailings)

  res.send({ method: 'GET', status: 'ok', api: req.url })
}

module.exports = restoreBackupCopy
