const normalizeNotificationUsers = require('./normalizeNotificationUsers')
const restoreBackupCopy = require('./restoreBackupCopy')
const backupCopyDatabase = require('./backupCopyDatabase')
const addTextCookies = require('./addTextCookies')

module.exports = {
  normalizeNotificationUsers,
  backupCopyDatabase,
  restoreBackupCopy,
  addTextCookies
}
