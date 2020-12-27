const mongoose = require('mongoose')

const recipeSchema = new mongoose.Schema({
  title: String, 
  name: String,
  desc: String,
  picture: String, 
  ratings: [Number],
  servings: Number,
  ingredients: Map, 
  instructions: [String],
}, {collection: 'recipes'})

const recipe = mongoose.model('recipes', recipeSchema)

module.exports = recipe