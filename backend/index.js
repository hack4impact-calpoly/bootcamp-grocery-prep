const express = require('express')
const app = express()


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

app.listen(3000)