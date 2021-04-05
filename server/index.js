const express = require('express')
const config = require('config')

module.exports = () => {
  const app = express()
  const PORT = config.get('port')

  app.use('/api', require('./api/analytics.js'))

  app.listen(PORT, () => {
    console.log(`Server started by PORT: ${PORT} ...`)
  })
}
