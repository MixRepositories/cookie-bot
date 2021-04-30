const express = require('express')
const { addNewPredictionsByCategories } = require('./controllers')
const { normalizePredictions } = require('./controllers')
const { backupCopyDatabase } = require('./controllers')
const { restoreBackupCopy } = require('./controllers')
const { addTextCookies } = require('./controllers')
const { addCategories } = require('./controllers')

const router = express.Router()

router.get('/helpers/add-new-predictions-by-categories', addNewPredictionsByCategories)
router.get('/helpers/normalize-predictions', normalizePredictions)
router.get('/helpers/backup-copy-database', backupCopyDatabase)
router.get('/helpers/restore-backup-copy', restoreBackupCopy)
router.get('/helpers/add-text-cookies', addTextCookies)
router.get('/helpers/add-categories', addCategories)

module.exports = router
