const User = require('../../db/models/User')
const config = require('config')
const googleSheetsInit = require('../../utils/googleSheets/googleSheetsInit')
const Prediction = require('../../db/models/Prediction')
const Language = require('../../db/models/Language')

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
