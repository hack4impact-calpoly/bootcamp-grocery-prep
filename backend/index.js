const express = require('express')
const bodyParser = require('body-parser')
const app = express()

app.use("/", express.static('../public'))

app.use(bodyParser.json())

app.use((req, res, next) => {
    req.timestamp = new Date()
    console.log(req.timestamp)
    next()
})

app.get('/api/recipe', (req, res) => {
    console.log("4 recipes requested")
    res.status(200);
    res.send("Simple Man's Carbonara\n Cantonese Style Scrambled Eggs\n Pineapple Fried Rice\n Travis Scott Burger 2: Electric Boogaloo")
})

app.get('/api/recipe/:name', (req, res) => {
    const recipe = req.params.name
    if (typeof recipe === undefined || recipe.length === 0){
        res.status(400)
        res.send("Error: NO NAME")
    }
    console.log(recipe)
    res.status(200);
    res.send(`You requested ${recipe}!`)
})

app.post('/api/rating', (req, res) => {
    console.log(req.body.id, req.body.rating)
    res.status(200)
    res.send("Rating Posted!")
})

app.listen(3000)