const mongoose = require("mongoose")

const recipeSchema = new mongoose.Schema({
	"title": String,
	"desc": String,
	"picture": String,
	"ratings": Array,
	"servings": Number,
	"ingredients": Object,
	"instructions": Array
}, {collection: "RecipeCollection"})

const Recipe = mongoose.model("RecipeCollection", recipeSchema)

module.exports = Recipe
