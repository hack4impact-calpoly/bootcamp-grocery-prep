const mongoose = require('mongoose')

const recipeSchema = new mongoose.Schema({
	"title": {
		type: String
	},
	"desc": {
		type: String
	},
	"img": {
		type: String
	},
	"ratings": {
		type: []
	},
	"servings": {
		type: String
	},
	"ingredients": {
		type: Map,
		of: String
	},
	"instructions": {
		type: []
	}
})

const Recipe = mongoose.model('Recipe', recipeSchema)

module.exports = Recipe
