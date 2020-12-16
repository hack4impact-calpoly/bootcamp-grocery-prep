const mongoose = require('mongoose')

const recipeSchema = new mongoose.Schema({
  title: String,
  time: [Number],
  desc: String,
  picture: String,
  rating: [Number],
  servings: Number,
  ingredients: [Object],
  instructions: [String]
}, {collection: 'recipes'})

const recipe = mongoose.model('recipes', recipeSchema)

module.exports = recipe
