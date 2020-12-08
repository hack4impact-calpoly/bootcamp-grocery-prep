const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

app.use(bodyParser.json())
app.use(express.static('public'))
app.use("api/recipe/random", express.static("../recipe/random.html"))
app.use('/css', express.static('css'))

mongoose.connect("mongodb+srv://stick:sleepy.stick@recipes.mongodb.net/", {
    useNewUrlParser: true,
    newUnifiedTopolody: true,
    useFindAndModify: false,
    useCreateIndex: true
}).then(()=> console.log('Connected to MongoDB'))

app.get('/api/recipe', (req, res) => {
    console.log("list of recipes requested")
    res.status(200)
    res.send("list of recipes requested")
})

//app.get('/api/recipe/random', (req, res) => {
//    console.log("random recipes requested")
//    res.status(200)
//    app.use('api/recipe/random', express.static("public"))
    //res.send("random recipe requested")
//})

app.get('/api/recipe/:name', (req, res) => {
    const name = req.params.name

    console.log('instructions for ' + name + ' requested')
    res.status(200)
    res.send("instructions for " + name + " requested")
})

app.post('/api/rating', (req, res) => {
    const id = req.body.id
    const rating = req.body.rating
    console.log("rating of " + req.body.rating + "recieved for recipe with id " + req.body.id)
    res.status(200)
    res.send("rating of " + rating + "recieved for recipe with id " + id)
})


app.listen(3000)
