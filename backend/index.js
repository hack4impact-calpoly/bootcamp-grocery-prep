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
	res.send('list of recipes requested')
})

app.get('/api/recipe/random', (req, res) => {
	res.status(200)
	res.send('random recipe requested')
})

app.get('/api/recipe/:name', (req, res) => {
	const name = req.params.name
	
	if(typeof name === undefined || name.length === 0){
		res.status(400)
		res.send('ERROR: NO NAME')
	}

	res.status(200)
	res.send(`instructions for ${name} requested`)
})

app.post('/api/rating', (req, res) => {
	console.log(req.body.id, req.body.rating)
	res.status(200)
	res.send(`rating posted`)
})

app.get('/api/cart', (req, res) => {
	res.status(200)
	res.send('list of items in cart requested')
})

app.post('/api/cart', (req, res) => {
	const quantity = req.body.quantity
	const id = req.body.id

	console.log(quantity, id)

	res.status(200)
	res.send(`${quantity} of recipe ${id} added to cart`)
})

app.listen(3000)
