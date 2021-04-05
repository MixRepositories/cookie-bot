const express = require('express')
const { all } = require('../controllers/analytics')
const router = express.Router()

router.get('/analytics', all)

module.exports = router
