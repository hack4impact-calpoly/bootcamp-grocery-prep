const mongoose = require('mongoose')

const recipeSchema = new mongoose.Schema({
  title: String,
  desc: String, 
  picture: String, 
  ratings: [Number],
  servings: Number,
  ingredients: Map,
  instructions: [String]
}, {collection: "MyRecipes"})

const Recipe = mongoose.model('MyRecipes', recipeSchema)

module.exports = Recipe