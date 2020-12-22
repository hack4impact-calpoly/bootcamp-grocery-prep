const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const app = express()

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


app.get("/api/recipe", (req,res) => {
  res.status(200)
  res.send("list of recipes requested")
})


app.get("/api/recipe/:name", (req,res) =>{
  res.status(200)
  let name = req.params.name
  res.send(`instructions for ${name} requested`)
})

app.post("/api/rating", (req, res) =>{
  res.status(200)
  let rating = req.body.rating
  let id = req.body.id
  res.send(`rating of ${rating} for recipe ${id}`)
})

app.use(express.static("./../public")) //serves index/html which leads to main site

mongoose.connect("DATABASE_URL", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
}).then(() => console.log('Connected to MongoDB'))


app.listen(3000)