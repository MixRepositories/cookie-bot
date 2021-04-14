const express = require('express')
const { updateAll } = require('./controllers')
const router = express.Router()

router.get('/analytics/update-all', updateAll)

module.exports = router
