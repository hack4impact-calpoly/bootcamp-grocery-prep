const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 8000

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
})

app.use(bodyParser.json())

// app.use((request, response, next) => {
//     request.timestamp = new Date()
//     console.log(request.timestamp)
//     next()
// })

app.use(express.static('public'))

app.get('/', (request, response) => {
    response.status(200)
    response.send('Hello!')
})

// `GET - /api/recipe` - "list of recipes requested"
app.get('/api/recipe', (request, response) => {
    response.status(200)
    response.send('List of recipes requested')
})

// `GET - /api/recipe/:name` - "instructions for `name` requested"
app.get('/api/recipe/:name', (request, response) => {
    const name = request.params.name 
    response.status(200)
    response.send("Instructions for " + name + " requested")
})

// `POST - /api/rating` - "rating of `rating` received for recipe `id`"
app.post('/api/rating', (request, response) => {
    const id = request.body.id
    const rating = request.body.rating
    response.status(200)
    response.send("Rating of " + rating + " received for recipe " + id)
})


// `GET - /api/recipeRandom` - "random recipe requested"
app.get('/api/recipeRandom', (request, response) => {
    response.send('Random recipe requested')
})

// `GET - /api/cart` - "here are the items in your cart"
app.get('/api/cart', (request, response) => {
    response.send('Here are the items in your cart')
})

// `POST - /api/cart` - "`quantity` of recipe `id` added to cart"
app.post('/api/cart', (request, response) => {
    const id = request.body.id
    const quantity = request.body.quantity
    response.status(200)
    response.send( quantity + " of recipe " + id + " added to cart")
})