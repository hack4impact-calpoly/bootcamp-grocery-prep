const mongoose = require ('mongoose')

const recipeSchema = new mongoose.Schema({
	//_id: mongoose.ObjectIds,
	title: String,
	desc: String,
	picture: String,
	ratings: [Number],
	servings: Number,
	ingredients: [Object],
	instructions: [String]
}, {collection: 'Recipe'})

const recipe = mongoose.model('Recipe', recipeSchema)

module.exports = recipe
