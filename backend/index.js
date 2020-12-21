const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const mongoose = require('mongoose')
const Recipes = require('./models/recipeSchema.js') /*may need to check path*/

app.use(express.static(__dirname + "/../public"))
app.use(bodyParser.json())

mongoose.connect("mongodb+srv://DBMain:madman123@groceryprep.27ytp.mongodb.net/gettingStarted?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
}).then(() => console.log('Connected to MongoDB'))

const getAllRecipes = async () => {
  return Recipes.find({})
}

const getRecipe = async (name) => {
  return Recipes.find({"title": name})
}

const postRating = async (title, rating) => {
  Recipes.findOne({"title": title}, function (err, recipe) {
    recipe.ratings.push(Number(rating))
    recipe.save()
    console.log(recipe)
  })
}

app.get('/api/recipe', async (req, res) => {
  res.status(200)  
  let recipe = await getAllRecipes()
  res.send(recipe)
} )

app.get('/api/recipe/:name', async (req, res) => { // when testing on Postman - don't include :
    res.status(200)    
    const name = req.params.name
    let recipe = await getRecipe(name)
    res.send(recipe)
    console.log(recipe)
} )

app.post('/api/rating', async (req, res) => {
    res.status(200)  
    const name = req.body.title
    const rating = req.body.rating
    console.log(name, rating)
    await postRating(name, rating)
    res.send('Rating of '+rating+' received for recipe '+name)
  } )

app.get('/', (req, res) => {
  res.send('Hello test!')
} )
app.listen(3000)