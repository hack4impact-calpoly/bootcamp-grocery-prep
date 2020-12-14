const mongoose = require('mongoose')

const recipeSchema = new mongoose.Schema({
  title: String,
  desc: String, 
  picture: String, 
  ratings: [Number],
  servings: Number,
  ingredients: [String],
  instructions: [String]
}, {collection: "recipes"})

const Recipe = mongoose.model('MyRecipes', recipeSchema)

module.exports = Recipe