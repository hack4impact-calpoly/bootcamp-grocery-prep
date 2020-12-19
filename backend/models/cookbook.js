const mongoose = require('mongoose')

const recipeSchema = new mongoose.Schema({
    // an ID attribute will automatically be added on insert
    title: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    picture: {
        type: String,
        required: true
    },
    ratings: [
        Array
    ],
    servings: {
        type: Number,
        required: true
    },
    ingredients: {
      type: Map,
      of: Number
    },
    instructions: [
        String
    ]
}, { collection: 'theBookOfFoods' });

const Recipe = mongoose.model('theBookOfFoods', recipeSchema)

module.exports = Recipe