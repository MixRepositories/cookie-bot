const express = require('express')
const { normalizeStatusUsers } = require('./controllers')
const { backupCopyDatabase } = require('./controllers')
const { restoreBackupCopy } = require('./controllers')
const { addTextCookies } = require('./controllers')

const router = express.Router()

router.get('/helpers/normalize-status-users', normalizeStatusUsers)
router.get('/helpers/backup-copy-database', backupCopyDatabase)
router.get('/helpers/restore-backup-copy', restoreBackupCopy)
router.get('/helpers/add-text-cookies', addTextCookies)

module.exports = router
