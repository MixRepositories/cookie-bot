const express = require('express')
const { sendPromoMessageAndAddCookies } = require('../controllers/mailings')

const router = express.Router()

router.post('/mailings/send-promo-message-and-add-cookies', sendPromoMessageAndAddCookies)

module.exports = router
