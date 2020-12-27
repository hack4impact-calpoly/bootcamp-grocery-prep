const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
    "title": [String],
    "desc": [String],
    "picture": [String],
    "ratings": [Array],
    "servings": [Number],
    "ingredients": {
        type: Map,
        of: Number
    },
    "instructions": [Array]
}, {collection: 'Recipes'})

const Recipe = mongoose.model("Recipes", recipeSchema);

module.exports = Recipe;