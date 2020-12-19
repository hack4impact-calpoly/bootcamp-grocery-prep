const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    desc: String,
    pictureURL: String,
    ratings: [Number],
    servings: {
        type: Number,
        default: 1
    },
    ingredients: {
        type: Map,
        of: Number
    },
    instructions: [String]
}, { collection: "book" });

const Recipe = mongoose.model("recipe", recipeSchema);

module.exports = Recipe;