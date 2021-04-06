const express = require('express')
const { normalizeCrushCookies } = require('../controllers/helpers')

const router = express.Router()

router.get('/helpers/normalize-crush-cookies', normalizeCrushCookies)

module.exports = router
