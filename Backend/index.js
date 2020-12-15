const express = require('express')
const bodyParser = require('body-parser')
const app = express()

app.use(bodyParser.json())
app.use(express.static('public'))

//gets grocery list
app.get('/api/recipe', (req, res) => {
    res.status(200)
    res.send("List of recipes requested")
})

//gets specific grocery item
app.get('/api/recipe/:recipeName', (req, res) => {
    const recipeName = req.params.recipeName
    res.status(200)
    res.send("Instructions for " + recipeName + " requested" )
})

//posts rating
app.post('/api/rating', (req, res) => {
    const id = req.body.id
    const rating = req.body.rating
    res.status(200)
    res.send('Rating of ' + rating + " received for recipe " + id)
})

/* This following code was used to replicate Ethan's demo to try to understand Node and Express
app.use((req, res, next) => {
    req.timestamp = new Date()
    console.log(req.timestamp)
    next()
}) 

app.get('/', (req, res) => {
    res.status(200)
    res.send('hello, world!')
}) 

app.get('/hello/:name', (req, res) => {
    const name = req.params.name
    if (typeof name === undefined || name.length === 0){
        res.status(400)
        res.send('error, no name entered')
    }
    res.status(200)
    res.send('hello' + ' ' + name)
})

app.post('/rate', (req, res) => {
    console.log(req.body.food, req.body.rating)
    res.status(200)
    res.send('rating posted!')
})*/

app.listen(3002)