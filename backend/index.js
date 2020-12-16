const express = require("express")
//const bodyParser = require("body-parser")
const app = express()

const recipeEndpoints = require("./api/recipes.js")

//app.use(bodyParser.json())

app.use(express.static("../html"))

/*app.get("/api/recipe", (req, res) => {
	console.log('Visited "all recipes" page')
	res.status(200)
	res.send("All recipes page")
})

app.get("/api/recipe/:name", (req, res) => {
	const name = req.params.name
	console.log(`Visited "${name} recipe" page`)
	res.status(200)
	res.send(`${name} recipe page`)
})*/

app.use("/api/recipe/", recipeEndpoints)

/*app.post("/api/rating", (req, res) => {
	const food = req.body.food
	const rating = req.body.rating
	console.log(`food: ${food}, rating: ${rating}`)
	res.status(200)
	res.send(`Recipe ${food} recieved a rating of ${rating}`)
})*/

app.listen(3000)
