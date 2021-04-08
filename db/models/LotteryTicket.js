const mongoose = require('mongoose')
const { Schema } = require('mongoose')
const autoIncrement = require('mongoose-auto-increment')

autoIncrement.initialize(mongoose)
const LotteryTicketSchema = new Schema({
  id: { type: Number, required: true, unique: true },
  prize: { type: Number, required: true },
  user: { ref: 'user', type: Schema.Types.ObjectId },
  active: { type: Boolean, default: true }
})

LotteryTicketSchema.plugin(autoIncrement.plugin, { model: 'lotteryTicket', field: 'id', startAt: 1 })
const LotteryTicket = mongoose.model('lotteryTicket', LotteryTicketSchema)

module.exports = LotteryTicket
