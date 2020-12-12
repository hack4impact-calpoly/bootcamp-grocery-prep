const mongoose = require('mongoose');
 
const recipeSchema = new mongoose.Schema({
    title: String,
    desc: String,
    picture: String,
    ratings: [Number],
    servings: Number,
    ingredients: [String],
    instructions: [String],
}, {collection: 'RecipeCollection'});

const Recipe = mongoose.model('RecipeCollection', recipeSchema);
module.exports = Recipe