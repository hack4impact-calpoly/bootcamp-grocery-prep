const mongoose = require('mongoose')

const recipeSchema = new mongoose.Schema({
    title: String,
    desc: String,
    picture: String,
    ratings: [Number],
    servings: Number,
    ingredients: [Object],
    instructions: [String],
})

const Recipe = mongoose.model('Recipe', recipeSchema)

module.exports = Recipe
