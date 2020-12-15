const express = require('express')
const bodyParser = require('body-parser')
const app = express()

app.use(bodyParser.json())
app.use(express.static(__dirname + "/../public"))

app.get('/api/recipe', (req, res) => {
    res.status(200)
    res.send('List of recipes requested')
  } )

app.get('/api/recipe/:name', (req, res) => {
    const name = req.params.name
    res.status(200)
    res.send('Instructions for ' +name+ ' requested')
} )

app.post('/api/rating', (req, res) => {
    const rating = req.body.rating
    const id = req.body.id
    console.log(req.body.rating, req.body.id)
    res.status(200)
    res.send('Rating of '+rating+' received for recipe '+id)
  } )

app.get('/', (req, res) => {
  res.send('Hello test!')
} )
app.listen(3000)