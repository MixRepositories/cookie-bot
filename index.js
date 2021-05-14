const db = require('./db')
const bot = require('./bot')
const server = require('./server')

db
  .then(() => {
    bot.init()
    server()
  })
  .catch(error => {
    console.log('errorCatch', error)
  })
