const mongoose = require('mongoose')

const recipeSchema = new mongoose.Schema({
    name: String,
    picture: String,
    desc: String,
    ratings: [Number],
    servings: Number,
    ingredients: { type: String, of: Number },
    instructions: [String]
}, {collection: 'Recipes'})

const Recipe = mongoose.model('Recipes', recipeSchema)

module.exports = Recipe