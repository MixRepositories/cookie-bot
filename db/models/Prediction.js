const mongoose = require('mongoose')
const { Schema } = require('mongoose')

const PredictionSchema = new Schema({
  text: { type: String, required: true, unique: true },
  language: { ref: 'languages', type: Schema.Types.ObjectId },
  users_rated: [{ ref: 'user', type: Schema.Types.ObjectId }],
  category: { ref: 'categoryPrediction', type: Schema.Types.ObjectId },
  likes: { type: Number, default: 0 },
  dislikes: { type: Number, default: 0 }
})

const Prediction = mongoose.model('prediction', PredictionSchema)

module.exports = Prediction
