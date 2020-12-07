const express = require('express')
const bodyParser = require("body-parser")
const app = express()

app.use(bodyParser.json())

app.get("/api/recipe", (req, res) => {
	res.status(200)
	res.send("This request will return all of the recipes.")
})

app.get("/api/recipe/:name", (req, res) => {
	const name = req.params.name
	if(typeof name === undefined || name.length === 0){
		res.status(400)
		res.send("Error: No Name")
	}
	res.status(200)
	res.send(`This request will return the instructions for ${name}.`)
})

app.post("/api/rating", (req, res) => {
	console.log(req.body.food, req.body.rating)
	res.status(200)
	if(typeof req.body.food === undefined || typeof req.body.rating === undefined){
		res.status(400)
		res.send("Error: Undefined Values")
	}
	res.send(`The rating for ${req.body.food} has been posted, which was ${req.body.rating} out of 5`)
	
})

app.get('/', (req, res) => {
  res.send('Hello world!')
})

app.listen(3000)
