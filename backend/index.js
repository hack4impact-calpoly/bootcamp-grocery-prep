const express = require('express')
const app = express()
const bodyParser = require('body-parser')

const mongoose = require('mongoose')

const Recipe = require('./models/recipe')

mongoose.connect("mongodb+srv://VeeUser1:t0Rtl300p@milestone5-h4i.dna8l.mongodb.net/GroceryWebsite?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
}).then(() => console.log('Connect to MongoDB'))


app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', (req, res) => {
  res.send('Hello world!')
})

app.use(bodyParser.json())

app.get('/api/recipe', async (req, res) => {
  let recipe

  // find all recipes
  recipe = await Recipe.find({})
  console.log("api/rating works")
  res.json(recipe)
})

app.get('/api/recipe/:name', async (req, res) => {
  const name = req.params.name
  let recipe
  // find specific recipe
  recipe = await Recipe.find({title: name})
  
  console.log("api/rating/:name works")
  res.json(recipe)
})

app.post('/api/rating', async (req, res) => {
  // get recipe title, find recipe title in database
  const title = req.body.title
  const recipe = await Recipe.find({title: title})
  
  // get the array of the current ratings
  const currentRatings = recipe[0].rating

  // new rating
  const rating = req.body.rating

  // update array with new rating
  currentRatings.push(rating)
  console.log(currentRatings)
 
  // update database with new array
  await Recipe.updateOne(
  	{title: title},
  	{$set: {"rating": currentRatings}}
  )
  
  res.send("rating of " + rating + " received for recipe " + title)
})

app.use(express.static('public'))

// port 3001
app.listen(3001)
