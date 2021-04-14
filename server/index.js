const express = require('express')
const config = require('config')

module.exports = () => {
  const app = express()
  const PORT = config.get('port')

  app.use(express.json({ extended: true }))

  app.use('/api', require('./api/analytics/routers.js'))
  app.use('/api', require('./api/helpers/routers.js'))

  app.listen(PORT, () => {
    console.log(`Server started by PORT: ${PORT} ...`)
  })
}
