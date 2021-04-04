const db = require('./db')
const bot = require('./src/bot')
const getRowsWithPredictions = require('./src/utils/googleSheets/getRowsWithPredictions')
const Prediction = require('./src/models/Prediction')
const Language = require('./src/models/Language')
db
  .then(() => {
    bot()
    getRowsWithPredictions()
      .then(async rows => {
        const predictionObjects = []
        const lang = await Language.findOne({ code: 'ru' })

        rows.forEach(elem => {
          predictionObjects.push({
            text: elem.textPrediction,
            language: lang._id
          })
        })

        await Prediction.insertMany(
          predictionObjects
        )
      })
  })
  .catch(error => {
    console.log('errorCatch', error)
  })
