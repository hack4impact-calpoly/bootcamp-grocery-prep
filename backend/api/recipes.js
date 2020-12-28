const express = require("express")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const Recipe = require("../models/recipe")
const router = express.Router()

router.use(bodyParser.json())

mongoose.connect("mongodb+srv://user0:thisisaweirdpassword@cluster0.qez3n.mongodb.net/RecipeDatabase?retryWrites=true&w=majority", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
}).then(() => console.log("Connected to MongoDB"))

const getAllRecipes = async () => {
	return await Recipe.find({})
}

const getSpecificRecipe = async title => {
	return await Recipe.findOne({title: title})
}

const getRecipeById = async id => {
	return await Recipe.findOne({_id: id})
}

router.get("/recipe", async (req, res) => {
	console.log('Visited "all recipes" page')
	res.status(200)
	res.json(await getAllRecipes())
})

router.get("/recipe/:name", async (req, res) => {
	const name = req.params.name
	console.log(`Visited "${name} recipe" page`)
	res.status(200)
	res.send(await getSpecificRecipe(name))
})


router.post("/rating", async (req, res) => {
	const foodId = req.body._id
	const rating = req.body.rating
	if(rating > 0 && rating < 6) {
		console.log(`foodId: ${foodId}, rating: ${rating}`)
		await Recipe.update({_id: foodId}, {$push: {ratings: rating}})
	}else{
		console.log("rating is not in range 1-5")
	}
	res.status(200)
	res.send(`Recipe ${foodId} recieved a rating of ${rating}`)
})

module.exports = router
