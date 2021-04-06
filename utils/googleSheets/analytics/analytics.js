const { preparationDataForPush } = require('./utils')

async function updateSheets (sheet, header, source, data) {
  await sheet.clear()
  await sheet.setHeaderRow(header)

  data = data.map(elem => {
    return preparationDataForPush(header, source, elem)
  })

  await sheet.addRows(data)
}

module.exports = {
  updateSheets
}
