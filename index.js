const db = require('./db')
const Bot = require('./bot')
const server = require('./server')

db
  .then(() => {
    new Bot()
    server()
  })
  .catch(error => {
    console.log('errorCatch', error)
  })
