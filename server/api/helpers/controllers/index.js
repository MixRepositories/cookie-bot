const normalizeStatusUsers = require('./normalizeStatusUsers')
const restoreBackupCopy = require('./restoreBackupCopy')
const backupCopyDatabase = require('./backupCopyDatabase')
const addTextCookies = require('./addTextCookies')

module.exports = {
  normalizeStatusUsers,
  backupCopyDatabase,
  restoreBackupCopy,
  addTextCookies
}
