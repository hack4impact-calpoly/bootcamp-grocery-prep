const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const app = express()

const recipeEndpoints = require("./api/recipes.js")
const url = "mongodb+srv://bmcmann:H3ll0W0rld@bootcampc1.shnyh.mongodb.net/database?retryWrites=true&w=majority"


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

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
}).then(() => console.log('Connected to MongoDB'))


app.listen(3001)