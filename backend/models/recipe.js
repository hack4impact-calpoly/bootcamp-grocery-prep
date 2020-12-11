const mongoose = require('mongoose')

const recipeSchema = new mongoose.Schema({
    title: String,
    desc: String,
    pictureURL: String,
    ratings: [Number],
    servings: {type: Number, default: 1},
    ingredients: {
        type: Map,
        of: Number
    },
    instructions: [String]
})

const recipe = mongoose.model('Recipe', recipeSchema)

module.exports = recipe