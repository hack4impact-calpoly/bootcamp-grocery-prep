//  api/rating.js

const express = require('express')
const bodyParser = require('body-parser')
const router = express.Router()
const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://aaparmar:GDRFccK7cBsa5BJ7@cluster0.fympv.mongodb.net/GroceryPrep?retryWrites=true&w=majority', {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify: false,
	useCreateIndex: true
}).then(() => console.log('Connected to MongoDB'))

const recipeSchema = require('./../models/recipeSchema.js')

router.use(bodyParser.json())

router.post('/api/rating', async (req, res) => {
	const id = req.body.id
	const rating = req.body.rating

	if (rating < 0 || rating > 5) {
		res.status(400)
		res.send('error: enter a rating from 1 to 5')
	}

	else {
		const recipe = await recipeSchema.find({ title: id})			

		if (recipe.length === 0) {
			res.status(400)
			res.send('error: recipe not found :(')
		}
	
		else {
			const ratings = await recipeSchema.updateOne({ title: id }, { $push: { ratings: rating } })
	
			res.status(200)
			res.send(`rating of ${rating} received for recipe ${id}`)
		}
	}
})

module.exports = router
