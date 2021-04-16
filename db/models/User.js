const mongoose = require('mongoose')
const { Schema } = require('mongoose')

const UserSchema = new Schema({
  id: { type: Number, required: true, unique: true },
  first_name: String,
  last_name: String,
  username: String,
  is_bot: Boolean,

  language_code: { ref: 'language', type: Schema.Types.ObjectId },

  status: { type: Boolean, default: true },
  first_contact: { type: Number, default: Date.now() },
  last_sign_in: { type: Number, default: Date.now() },

  count_crush: { type: Number, default: 0 },
  cookies: { type: Number, default: 1 },
  last_crush: { type: Number, default: 0 },

  count_erase: { type: Number, default: 0 },
  lottery_ticket: { type: Number, default: 1 },
  last_erase: { type: Number, default: 0 }
})

const User = mongoose.model('user', UserSchema)

module.exports = User
