const express = require('express')
const { normalizeCrushCookies, addTextCookies } = require('../controllers/helpers')

const router = express.Router()

router.get('/helpers/normalize-crush-cookies', normalizeCrushCookies)
router.get('/helpers/add-text-cookies', addTextCookies)

module.exports = router
