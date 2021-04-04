const googleSheetsInit = require('./googleSheetsInit')

const addPredictionsInDatabase = async () => {
  const doc = await googleSheetsInit('1AloX3DNBtVtzIlaT4pHHtL_PKumXi6_RoKyAwEOJngs')
  const sheetsByIdElement = doc.sheetsById['0']
  const rows = await sheetsByIdElement.getRows()
  rows.forEach(elem => {
    console.log(elem.textPrediction)
  })
}

module.exports = addPredictionsInDatabase
