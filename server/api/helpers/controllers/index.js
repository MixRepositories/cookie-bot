const addNewPredictionsByCategories = require('./addNewPredictionsByCategories')
const normalizePredictions = require('./normalizePredictions')
const backupCopyDatabase = require('./backupCopyDatabase')
const restoreBackupCopy = require('./restoreBackupCopy')
const addTextCookies = require('./addTextCookies')
const addCategories = require('./addCategories')

module.exports = {
  addNewPredictionsByCategories,
  normalizePredictions,
  backupCopyDatabase,
  restoreBackupCopy,
  addTextCookies,
  addCategories
}
