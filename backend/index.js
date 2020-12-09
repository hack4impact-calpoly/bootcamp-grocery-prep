const express = require('express')
const app = express()

app.get('/', (req, res) => {
  res.send('Hello world!')
})


app.get('/api/recipe', (req, res) => {
  console.log("list of recipes requested")
  res.send("list of recipes requested")
})

app.get('/api/recipe/:name', (req, res) => {
  const name = req.params.name

  console.log("instructions for " +  name + " requested")
  res.send("instructions for " + name +  " requested")
})

app.post('/api/rating', (req, res) => {
  const id = req.body.id
  const rating = req.body.rating
  
  console.log("rating of " + rating + " received for recipe " + id)
  res.send("rating of " + rating + " received for recipe " + id)

  //console.log(req.body.id, req.body.rating)
  //res.send("okay")
})

//app.use(express.static('public'))

app.listen(3000)
