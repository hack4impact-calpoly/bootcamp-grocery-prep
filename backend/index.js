const express = require('express')
const bodyParser = require('body-parser')
const app = express()

app.use(bodyParser.json())

app.use(express.static('../'))

app.get('/api/recipe', (req, res) => {
    res.status(200)
    res.send('List of recipes requested!')
})

app.get('/api/recipe/:name', (req, res) => {
    const recipeName = req.params.name 

    if (typeof recipeName === undefined || recipeName.length === 0) {
        res.status(400)
        res.send('Error: no name specified')
    }
    else {
        res.status(200)
        res.send(`Instructions for ${recipeName} requested`)
    }

})

app.post('/api/rating', (req, res) => {
    console.log(req.body.id, req.body.rating)
    res.status(200)
    res.send(`Rating of ${req.body.rating} received for recipe ${req.body.id}`)
})

app.listen(3000)