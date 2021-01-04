const mongoose = require('mongoose')

const recipeSchema = new mongoose.Schema({
  title: StaticRange,
  desc: String, 
  picture: String, 
  ratings: [Number],
  servings: Number,
  ingredients: Map,
  instructions: [String]
})

const Recipe = mongoose.model('MyRecipes', recipeSchema)

module.exports = Recipe
