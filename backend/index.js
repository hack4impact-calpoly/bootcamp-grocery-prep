const express = require('express')
const bodyParser = require('body-parser')
const app = express()

app.use(bodyParser.json())

app.use((req, res, next) => {
   req.timestamp = new Date()
   console.log(req.timestamp)
   next()
})


app.get('/api/recipe', (req, res) => {

   res.status(200)
   res.send("Got Recipes!")
})

app.get('/api/recipe/random', (req, res) => {
   res.status(400)
   res.send("Here is a random Recipe!")
})

app.get('/api/recipe/:name', (req, res) => {
   const name = req.params.name

   res.status(400)
   res.send("Here is the Recipe you wanted!  " + name)
})

app.get('/api/cart', (req, res) => {
   res.status(400)
   res.send("Here is your cart!")
})

app.post('/api/rating', (req, res) => {
   console.log(req.body.id, req.body.rating)
   res.status(200)
   res.send('Rating Posted!')
})

app.post('/api/cart', (req, res) => {
   console.log(req.body.id, req.body.rating)
   res.status(200)
   res.send("Cart Filled!")
})

app.listen(3000)

