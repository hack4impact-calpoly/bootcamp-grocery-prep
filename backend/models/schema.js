const mongoose = require('mongoose')

const recipeSchema = new mongoose.Schema({
    name: String,
    picture: String,
    desc: String,
    ratings: [Number],
    servings: Number,
    ingredients: Object,
    instructions: [String]
}, {collection: 'Recipes'})

const Recipe = mongoose.model('Recipes', recipeSchema)

module.exports = Recipe