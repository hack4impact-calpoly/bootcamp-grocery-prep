const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
    title: String,
    desc: String,
    picture: String,
    ratings: Array,
    servings: Number,
    ingredients: Array,
    instructions: Array
});

const Recipe = mongoose.model('Recipe', recipeSchema, 'recipe-collection');
module.exports = Recipe;