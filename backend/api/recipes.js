const express = require("express")
const bodyParser = require("body-parser")
const router = express.Router()

router.use(bodyParser.json())

router.get("/", (req, res) => {
	console.log('Visited "all recipes" page')
	res.status(200)
	res.send("All recipes page")
})

router.get("/:name", (req, res) => {
	const name = req.params.name
	console.log(`Visited "${name} recipe" page`)
	res.status(200)
	res.send(`${name} recipe page`)
})

router.post("../rating", (req, res) => {
	const food = req.body.food
	const rating = req.body.rating
	console.log(`food: ${food}, rating: ${rating}`)
	res.status(200)
	res.send(`Recipe ${food} recieved a rating of ${rating}`)
})

module.exports = router
