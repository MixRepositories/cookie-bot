const path = require('path')
const { GoogleSpreadsheet } = require('google-spreadsheet')
const credentials = require(path.resolve(__dirname, 'credentials.json'))

/**
 * Функция авторизации и инициализации гугл таблицы
 * @param {string} spreadsheetId Идентификатор таблицы
 * @returns {Promise<GoogleSpreadsheet>}
 */
const googleSheetsInit = async (spreadsheetId) => {
  const doc = new GoogleSpreadsheet(spreadsheetId)
  await doc.useServiceAccountAuth(credentials)
  await doc.loadInfo()
  return doc
}

module.exports = googleSheetsInit
