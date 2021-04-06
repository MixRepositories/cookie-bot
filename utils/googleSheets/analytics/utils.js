function preparationDataForPush (header, source, data) {
  const responseObject = {}
  header.forEach((e, i) => {
    responseObject[e] = data[source[i]]
  })
  return responseObject
}

module.exports = {
  preparationDataForPush
}
