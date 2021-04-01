const mongoose = require('mongoose')
const { Schema } = require('mongoose')

const UserSchema = new Schema({
  id: { type: Number, required: true, unique: true },
  first_name: { type: String },
  last_name: { type: String },
  username: { type: String },
  is_bot: { type: Boolean, required: true },
  language_code: { type: String, required: true },
  first_contact: { type: Date, default: Date, required: true },
  cookies: { type: Number, default: 1 },
  last_crush: { type: Date }
})

const User = mongoose.model('user', UserSchema)

module.exports = User
