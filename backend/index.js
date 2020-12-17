const express = require('express')
const bodyParser = require('body-parser')
const app = express()

app.use(bodyParser.json())
//app.use(express.static("./../public"))
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
  res.send("list of recipes requested")
})


app.get("/api/recipe/:name", (req,res) =>{
  let name = req.params.name
  res.send(`instructions for ${name} requested`)
})

app.post("/api/rating", (req, res) =>{
  let rating = req.body.rating
  let id = req.body.id
  res.send(`rating of ${rating} for recipe ${id}`)
})

app.listen(3000)