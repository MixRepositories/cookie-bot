const db = require('./db')
const bot = require('./src/bot')

db
  .then(() => {
    bot()
  })
  .catch(error => {
    console.log('errorCatch', error)
  })
