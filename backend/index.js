const express = require('express')
const bodyParser = require('body-parser')
const app = express()

app.use(bodyParser.json())

//app.use((req, res, next) => {
	//req.timestamp = new Date()
	//console.log(req.timestamp)
	//next()
//})
//app.use(express.static('public'))
//app.use(express.static(__dirname + "/../public"))

//app.get('/', (request, response) => {
	//response.status(200)
	//response.send('Hello world!')
//})

//app.use('/imgs', express.static('imgs'))

//app.get('/hello/:name', (req, res) => {
	//const name = req.query.name --> '/hello'
	//const name = req.params.name

	//if (typeof name === undefined || name.length === 0) {
		//res.status(400)
		//res.send('error: no name :(')
	//}

	//res.status(200)
	//res.send(`hello ${name}!`)
//})
//
//app.post('/rate', (req, res) => {
//	console.log(req.body.food, req.body.rating)
//	res.status(200)
//	res.send('rating posted!')
//})

app.get('/api/recipe', (req, res) => {
	res.status(200)
	res.send('list of recipes requested')
})

app.get('/api/recipe/:name', (req, res) => {
	const recipeName = req.params.name

	res.status(200)
	res.send(`instructions for ${recipeName} requested`)
})

app.post('/api/rating', (req, res) => {
	const id = req.body.id
	const rating = req.body.rating

	res.status(200)
	res.send(`rating of ${rating} received for recipe ${id}`)
})

app.listen(3000)
