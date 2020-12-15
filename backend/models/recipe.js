const mongoose = require('mongoose')

const recipeSchema = new mongoose.Schema({
   title: String,
   desc: String,
   picture: String,
   ratings: [String],
   servings: String,
   ingredients: [{ingredient: String, amount: String}],
   instructions: [String]
})

const Recipe = mongoose.model("recipe", recipeSchema)

module.exports = Recipe
