const express = require('express')
const app = express()
const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Hello world!')
})
  
app.use(express.static('../'))

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
    const rating = req.body.rating
    const id = req.body.id
    if (typeof rating === undefined || rating.length === 0 || typeof id === undefined || id.length ===0) {
        res.send('please try again')
    }
    res.send(`rating of ${rating} received for ${id}`)
})

app.listen(3000)
