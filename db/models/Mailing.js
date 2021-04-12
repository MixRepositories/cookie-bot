const mongoose = require('mongoose')
const { Schema } = require('mongoose')

const MailingSchema = new Schema({
  status: { type: Boolean, default: true },
  text: String,
  buttons: {
    buttonsType: String,
    collectionName: String,
    default: {}
  },
  delivery_date: { type: Number, default: 0 }, // ms
  addressee: { type: Object }
})

const Mailing = mongoose.model('mailing', MailingSchema)

module.exports = Mailing
