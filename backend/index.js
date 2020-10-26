const express = require('express')
const bodyParser = require('body-parser')
const app = express()

app.use(bodyParser.json())

app.get('/', (req, res) => {
	res.status(200)
	res.send('hello world!')
})

app.get('/api/recipe', (req, res) => {
	res.status(200)
	res.send('GET list of recipes')
})

app.get('/api/recipe/random', (req, res) => {
	res.status(200)
	res.send('GET random recipe')
})

app.get('/api/recipe/:name', (req, res) => {
	const name = req.params.name
	
	//shouldn't happen
	if(typeof name === undefined || name.length === 0){
		res.status(400)
		res.send('ERROR: NO NAME SPECIFIED')
	}

	res.status(200)
	res.send(`GET instructions for recipe ${name}`)
})

app.post('/api/rating', (req, res) => {
	console.log(req.body)
	
	const id = req.body.id
	const rating = req.body.rating

	if(typeof id === undefined || id.length === 0){
		res.send("ERROR: NO ID SPECIFIED")
	}
	if(typeof rating === undefined || rating.length === 0){
		res.send("ERROR: NO RATING SPECIFIED")
	}

	res.status(200)
	res.send(`POST rating ${rating} for recipe ${id}`)
})

app.get('/api/cart', (req, res) => {
	res.status(200)
	res.send('GET items in cart')
})

app.post('/api/cart', (req, res) => {
	console.log(req.body)
	
	const quantity = req.body.quantity
	const id = req.body.id

	if(quantity === undefined || quantity.length === 0){
		res.send("ERROR: NO QUANTITY SPECIFIED")
	}
	if(id === undefined || id.length === 0){
		res.send("ERROR: NO ID SPECIFIED")
	}

	res.status(200)
	res.send(`[POST] ${quantity} of recipe ${id} added to cart`)
})

app.listen(3000)
