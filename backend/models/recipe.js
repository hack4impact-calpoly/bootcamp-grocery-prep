const mongoose = require('mongoose')

const recipeSchema = new mongoose.Schema({
  title: String,
  image: String,
  rating: [Number],
  serving: Number,
  ingredients: [Object],
  steps: [String],
}, {collection: 'Recipe'})

const Recipe = mongoose.model('Recipe', recipeSchema)

module.exports = Recipe
