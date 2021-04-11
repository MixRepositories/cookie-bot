async function updateSheets (sheet, header, data) {
  await sheet.clear()
  await sheet.setHeaderRow(header)
  await sheet.addRows(data)
}

module.exports = {
  updateSheets
}
