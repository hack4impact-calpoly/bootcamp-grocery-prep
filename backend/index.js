const express = require("express")
const app = express()
const port = 3000

app.get('/api/recipe', (req, res) => {
    res.status(200)
    res.send('list of recipes requested')
})

app.get('/api/recipe/random', (req, res) => {
    res.status(200)
    res.send('random recipe requested')
})

app.get('/api/recipe/:name', (req, res) => {
    const name = req.body.name
    res.status(200)
    res.send('instructions for' + name + ' requested')
})

app.post('/api/rating', (req, res) => {
    const rating = req.body.rating
    const id = req.body.id
    res.status(200)
    res.send('rating of ' + rating + ' recieved for recipe ' + id)
})

app.get('/api/cart', (req, res) => {
    res.status(200)
    res.send('here are the items in your cart')
})

app.post('/api/cart', (req, res) => {
    const id = req.body.id
    const quantity = req.body.quantity
    res.status(200)
    res.send(quantity + ' of recipe' + id + ' added to cart')
})

app.listen(port);


