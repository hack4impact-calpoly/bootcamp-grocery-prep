const mongoose = require('mongoose')

const recipeSchema = new mongoose.Schema({
    title: String,
    meal: String,
    desc: String,
    picture: String,
    ratings: [Number],
    servings: Number,
    ingredients: [{}],
    instructions: [String]
}, {collection: 'recipe'} )
const Recipe = mongoose.model('Recipe', recipeSchema)
module.exports = Recipe