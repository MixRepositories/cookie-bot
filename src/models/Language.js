const mongoose = require('mongoose')
const { Schema } = require('mongoose')

const LanguageSchema = new Schema({
  language_code: { type: String, required: true, unique: true }
})

const Language = mongoose.model('language', LanguageSchema)

module.exports = Language
