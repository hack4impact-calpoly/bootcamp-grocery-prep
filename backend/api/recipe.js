//  api/recipe.js

const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://aaparmar:GDRFccK7cBsa5BJ7@cluster0.fympv.mongodb.net/GroceryPrep?retryWrites=true&w=majority', {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false,
	useCreateIndex: true
}).then(() => console.log('Connected to MongoDB'))

const recipeSchema = require('./../models/recipeSchema.js')

router.get('/api/recipe/:name', async (req, res) => {
	const recipeName = req.params.name
	const recipe = await recipeSchema.find({ title: recipeName })

	if (recipe.length === 0) {
		res.status(400)
		res.send('error: recipe not found :(')
	}
	       
	else {
		res.status(200)
		//res.send(`instructions for ${recipeName} requested`)
		res.json(recipe)
	}
})

module.exports = router
