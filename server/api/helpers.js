const express = require('express')
const { restoreBackupCopy } = require('../controllers/helpers')
const { backupCopyDatabase } = require('../controllers/helpers')
const { normalizeCrushCookies, addTextCookies } = require('../controllers/helpers')

const router = express.Router()

router.get('/helpers/normalize-crush-cookies', normalizeCrushCookies)
router.get('/helpers/add-text-cookies', addTextCookies)
router.get('/helpers/backup-copy-database', backupCopyDatabase)
router.get('/helpers/restore-backup-copy', restoreBackupCopy)

module.exports = router
