const mongoose = require('mongoose')

const recipeSchema = new mongoose.Schema({
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
    ratings: {
        type: Array,
        required: true,
        index: true
    },
    servings: {
        type: Number,
        required: true
    },
    ingredients: {
        type: Object,
        //Add something about the object's property?
        required: true
    },
    instructions: {
        type: Array,
        required: true
    }
}, {collection: "recipe"})

const Recipe = mongoose.model("recipe", recipeSchema); 

module.exports = Recipe
