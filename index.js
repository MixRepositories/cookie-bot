const db = require('./db')
const bot = require('./bot')

db
  .then(() => {
    bot()
  })
  .catch(error => {
    console.log('errorCatch', error)
  })
