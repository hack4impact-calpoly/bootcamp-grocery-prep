const express = require('express')
const app = express()
const bodyParser = require('body-parser')


app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.status(200)
  res.send("test")
})

app.get('/api/recipe', (req, res) => {
  res.status(200)
  res.send("list of recipes requested")
})

app.get('/api/recipe/random', (req, res) => {
  res.status(200)
  res.send("Random recipe requested")
})

app.get('/api/recipe/:name', (req, res) => {
  const name = req.params.name
  res.status(200)
  res.send(`Hello ${name}!`)
})

app.get('/api/cart', (req, res) => {
  const name = req.params.name
  res.status(200)
  res.send(`Here are the items in your cart!`)
})

app.post('/api/rating', (req, res) => {
  const rating = req.body.rating
  const id = req.body.id
  res.status(200)
  res.send(`Rating of ${rating} recieved for ${id}`)
})

app.post('/api/cart', (req, res) => {
  const quantity = req.body.quantity
  const id = req.body.id
  res.status(200)
  res.send(`${quantity} orders of recipe ${id} added to cart`)
})

app.listen(3000)