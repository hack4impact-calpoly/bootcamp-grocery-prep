const mongoose = require('mongoose')

const recipeSchema = new mongoose.Schema({
  title: {
	type: String,
	required: true
  },
  image: {
	type: String,
	required: true
  },
  rating: {
	type: Array,
	required: true
  },
  serving: {
	type: Number,
	required: true
  },
  ingredients: {
	type: Object,
	required: true
  },
  steps: {
	type: Array,
	required: true
  }
})

const Recipe = mongoose.model('Recipe', recipeSchema)

module.exports = Recipe
