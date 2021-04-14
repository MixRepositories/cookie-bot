const googleSheetsInit = require('../../../../utils/googleSheets/googleSheetsInit')
const Prediction = require('../../../../db/models/Prediction')
const Language = require('../../../../db/models/Language')
const config = require('config')

/**
 * Добавляет новые текст для печеньки в таблицу
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
const addTextCookies = async (req, res) => {
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

  res.send({ method: 'GET', status: 'ok', api: req.url })
}

module.exports = addTextCookies
