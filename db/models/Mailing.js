const mongoose = require('mongoose')
const { Schema } = require('mongoose')

const MailingSchema = new Schema({
  name: { type: String, required: true, unique: true },
  active: { type: Boolean, default: true }
})

const Mailing = mongoose.model('mailing', MailingSchema)

module.exports = Mailing
