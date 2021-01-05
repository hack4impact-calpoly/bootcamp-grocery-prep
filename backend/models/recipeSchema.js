const mongoose = require('mongoose')

const recipeSchema = new mongoose.Schema({
    
    "title": String,
    "desc": String,
    "picture": String,
    "ratings": [Number],
    "servings": Number,
    "ingredients": [Object],
    "instructions": [String]
},
{ collection: 'recipe' })

const Recipe = mongoose.model('recipe', recipeSchema)

module.exports = Recipe