const express = require('express')
const app = express()
const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Hello world!')
})
  
app.use(express.static('public'))

app.get('/api/recipe', (req, res) => {
    res.send('list of all recipes requested')
})

app.get('/api/recipe/:name', (req, res) => {
    const name = req.params.name
    if (typeof name === undefined || name.length === 0) {
        res.send('try again buddy')
    }
    res.send(`instructions for ${name} requested`)
})

app.post('/api/rating', (req, res) => {
    res.send(`rating of ${req.body.rating} received for ${req.body.id}`)
})

app.listen(3000)
