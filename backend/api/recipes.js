//  api/recipes.js

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

router.get('/api/recipe', async (req, res) => {
	const recipes = await recipeSchema.find({}, { title: 1 })
	
	res.status(200)
	//res.send('list of recipes requested')
	res.json(recipes)
})

module.exports = router
