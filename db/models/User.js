const mongoose = require('mongoose')
const { Schema } = require('mongoose')

const UserSchema = new Schema({
  id: { type: Number, required: true, unique: true },
  first_name: { type: String },
  last_name: { type: String },
  username: { type: String },
  is_bot: { type: Boolean, required: true },
  language_code: { ref: 'language', type: Schema.Types.ObjectId },
  first_contact: { type: Number, required: true },
  count_crush: { type: Number, default: 0 },
  cookies: { type: Number, default: 1 },
  last_crush: { type: Number, default: 0 },
  count_erase: { type: Number, default: 0 },
  lottery_ticket: { type: Number, default: 0 },
  last_erase: { type: Number, default: 0 }
})

const User = mongoose.model('user', UserSchema)

module.exports = User
