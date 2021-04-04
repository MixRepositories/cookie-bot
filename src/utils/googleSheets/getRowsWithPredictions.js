const googleSheetsInit = require('./googleSheetsInit')

const getRowsWithPredictions = async () => {
  const doc = await googleSheetsInit('1AloX3DNBtVtzIlaT4pHHtL_PKumXi6_RoKyAwEOJngs')
  const sheetsByIdElement = doc.sheetsById['0']
  return await sheetsByIdElement.getRows()
}

module.exports = getRowsWithPredictions
