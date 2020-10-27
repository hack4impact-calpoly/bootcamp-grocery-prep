const express = require('express')
const bodyParser = require('body-parser')
const app = express()

app.use(bodyParser.json())

app.get('/https://3blzgwgi13.execute-api.us-west-2.amazonaws.com/Live/recipe', (req, res) => {
    res.status(200)
    res.send('list of recipes reuqested')
})
app.get('/https://3blzgwgi13.execute-api.us-west-2.amazonaws.com/Live/recipe/random', (req, res) => {
    res.status(200)
    res.send('random recipe requested')
})
app.get('/https://3blzgwgi13.execute-api.us-west-2.amazonaws.com/Live/cart', (req, res) => {
    res.status(200)
    res.send('Here are a list of items in your cart')
})
app.get('/https://3blzgwgi13.execute-api.us-west-2.amazonaws.com/Live/recipe/:name', (req, res) => {
    const name = req.params.name
        if(name === undefined || name.length === 0){
            res.status(400)
            res.send("Error: no recipe requested")
        }
    res.status(200)
    res.send('Requesting recipe for ' + name)
})

app.post('/https://3blzgwgi13.execute-api.us-west-2.amazonaws.com/Live/rate', (req,res) => {
    console.log(req.body.rating, req.body.id)
    res.status(200)
    res.send("rating for " + req.body.id + " is " + req.body.rating )
})

app.post('/https://3blzgwgi13.execute-api.us-west-2.amazonaws.com/Live/cart', (req,res) => {
    res.status(200)
    console.log(req.body, req.body)
    res.send(req.body.quantity + " of " + req.body.id + " was added to cart" )
})
app.listen(3000)