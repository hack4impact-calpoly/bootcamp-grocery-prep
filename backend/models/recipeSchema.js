const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    name: String,
    description: String,
    image: String,
    ratings: [Number],
    servings: Number,
    ingredients: [{ title: String, quantity: Number}],
    instructions: [String]
});

const RecipeModel = mongoose.model('recipes', schema);

module.exports = RecipeModel;
