const mongoose = require('mongoose')
const { Schema } = require('mongoose')

const CategoryPredictionSchema = new Schema({
  code: { type: String, required: true, unique: true }
})

const CategoryPrediction = mongoose.model('categoryPrediction', CategoryPredictionSchema)

module.exports = CategoryPrediction
