const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({
    title: String,
    desc: String,
    pictureURL: String,
    ratings: [{
        type: Number,
        required: true
    }],
    servings: {
        type: Number,
        default: 1
    },
    ingredients: {
        type: Map,
        of: Number
    },
    instructions: [String]
});

const Recipe = mongoose.model("recipe", recipeSchema);

module.exports = Recipe;