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

/*router.post("/post", async (req, res) => {
	console.log('Posted recipe')
	const obj = new Object()
	obj.ingredient1 = "bread"
	obj.ingredient2 = "salt"
	const sample = await new Recipe({
		title: "Sample recipe",
		desc: "This is a sample recipe and hopefully it shows up",
		picture: "not/an/actual/picture.jpg",
		ratings: [1,2,3],
		servings: 2,
		ingredients: obj,
		instructions: ["Instruction 1", "Instruction 2", "Instruction 3"]
	}).save()
	res.json(sample)
})
*/

router.get("/rating", async (req, res) => {
	console.log("all good")
	res.status(200)
	res.send("worked")
})

router.post("/rating", async (req, res) => {
	const foodId = req.body._id
	console.log(foodId)
	const rating = req.body.rating
	console.log(`foodId: ${foodId}, rating: ${rating}`)
	await Recipe.update({_id: foodId}, {$push: {ratings: rating}})
	res.status(200)
	res.send(`Recipe ${foodId} recieved a rating of ${rating}`)
})

module.exports = router
