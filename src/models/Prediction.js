const mongoose = require('mongoose')
const { Schema } = require('mongoose')

const PredictionSchema = new Schema({
  text: { type: String, required: true, unique: true },
  language: {
    ref: 'languages',
    type: Schema.Types.ObjectId
  }
})

const Prediction = mongoose.model('prediction', PredictionSchema)

module.exports = Prediction
