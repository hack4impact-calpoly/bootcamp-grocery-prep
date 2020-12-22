const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const app = express()

const recipeEndpoints = require("./api/recipes.js")

app.use(bodyParser.json())

//app.use(express.static("./../"))

//app.use(express.static("./.."))

// app.get('/', (req, res) => {
//   res.send('Hello world!')
// })

// app.get('/hola/:page', (req, res) => {
//   let page = req.params.page
//   res.send(page)
// })

app.use('/api/', recipeEndpoints)

app.use(express.static("./../public")) //serves index/html which leads to main site

// mongoose.connect("DATABASE_URL", {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   useFindAndModify: false,
//   useCreateIndex: true
// }).then(() => console.log('Connected to MongoDB'))


app.listen(3000)