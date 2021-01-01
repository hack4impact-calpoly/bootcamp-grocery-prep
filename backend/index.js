const express = require('express')
const bodyParser = require('body-parser')
const app = express()

app.use('/', express.static('../'))

app.use(bodyParser.json())

app.use((req, res, next) => {
    req.timestamp = new Date()
    console.log(req.timestamp)
    next()
})

app.get('/api/recipe', (req, res) => {
    console.log(`list of recipes requested`)
    res.status(200)
    res.send(`Oatmeal, Peanut Butter and Jelly Sandwich, Macaroni and Cheese, Chocolate Chip Cookies`)
})

app.get('/api/recipe/:name', (req, res) => {
    const recipeName = req.params.name

    if (typeof recipeName === undefined || recipeName.length === 0){
        res.status(400)
        res.send(`Error: NO RECIPE NAME`)
    }

    console.log(`instructions for ${recipeName} requested`)
    res.status(200)
    res.send(`${recipeName}`)
})

app.post('/api/rating', (req, res) => {
    const rating = req.body.rating
    const id = req.body.id

    if (typeof rating === undefined || rating.length === 0){
        res.status(400)
        res.send(`Error: NO RATING`)
    }

    if (typeof id === undefined || id.length === 0){
        res.status(400)
        res.send(`Error: NO ID`)
    }

    console.log(req.body.rating, req.body.id)
    console.log(`rating of ${rating} recieved for recipe ${id}`)
    res.status(200)
    res.send(`${rating} ${id}`)
})

app.listen(3000)
