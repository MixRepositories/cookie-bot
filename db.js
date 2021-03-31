const mongoose = require('mongoose')

const MONGO_USERNAME = 'cheprasov'
const MONGO_PASSWORD = 'Novosib54'
const MONGO_HOSTNAME = '127.0.0.1'
const MONGO_PORT = '27017'
const MONGO_DB = 'cookie'

module.exports = mongoose.connect(
  'mongodb://localhost:27017/cookie',
  {
    useUnifiedTopology: true,
    useNewUrlParser: true
  }
)
