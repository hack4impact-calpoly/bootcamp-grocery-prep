const mongoose = require('mongoose')

const recipeSchema = new mongoose.Schema({
	food: String,
	image: String,
	ratings: [Number],
	servings: Number,
	ingredients: [{}],
	instructions: [String]
}, {collection: 'recipe'})
const Recipe = mongoose.model('Recipe', recipeSchema)

module.exports = Recipe