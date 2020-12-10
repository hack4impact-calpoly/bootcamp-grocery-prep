/*
MONGO DB USER INFORMATION

username: dbUserCole
password: dbUserPasswordCole
*/


const mongoose = require('mongoose')

mongoose.connect("mongodb+srv://dbUserCole:dbUserPasswordCole@recipesdb.bbfme.mongodb.net/Recipes?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
}).then(() => console.log('Connected to MongoDB'))

const RecipeSchema = new mongoose.Schema({
    title: String,
    desc: String,
    picture: String,
    ratings: [Number],
    serving: Number,
    ingredients: [String],
    instructions: [String],
}, {collection: 'Recipe'});

const Recipe = mongoose.model('Recipe', RecipeSchema)
module.exports = Recipe

const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.json())
app.use(express.static(__dirname + '/../public'));

app.get('/', (req, res) => {
  res.status(200)
  res.send("test")
})

app.get('/api/recipe', async (req, res) => {
  res.status(200)
  let recipes;
  recipes = await getRecipes();
  res.json(recipes)
})

const getRecipes = async () => {
  return Recipe.find({});
}

app.get('/api/recipe/random', (req, res) => {
  res.status(200)
  res.send("Random recipe requested")
})

app.get('/api/recipe/:name', async (req, res) => {
  const name = req.params.name
  let recipes;
  recipes = await getRecipeByName(name);
  res.json(recipes)
})

const getRecipeByName = async (name) => {
  return Recipe.findOne({ 'title': name});
}

app.get('/api/cart', (req, res) => {
  const name = req.params.name
  res.status(200)
  res.send(`Here are the items in your cart!`)
})

app.post('/api/rating', async (req, res) => {
  const rating = req.body.rating
  const id = req.body.id
  res.status(200)
  await postRating(rating, id);
  res.send(`Rating of ${rating} recieved for ${id}`)
})

const postRating = async (rating, id) => {
  Recipe.findOne({ 'title': id }, function (err, recipe) {
    if (err)
      return handleError(err);
    let ratings = recipe.ratings
    ratings.push(Number(rating))
    recipe.ratings = ratings
    recipe.save()
  });
}

app.post('/api/cart', (req, res) => {
  const quantity = req.body.quantity
  const id = req.body.id
  res.status(200)
  res.send(`${quantity} orders of recipe ${id} added to cart`)
})

app.listen(3000)