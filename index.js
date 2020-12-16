const express = require('express')
const bodyParser = require('body-parser')
const app = express()

app.use(bodyParser.json())
app.use(express.static('html'))

const mongoose = require('mongoose')
const recipe = require('./models/recipes')


mongoose.connect("process.env.mongodb+srv://micahwib:food@cluster0.kr6vp.mongodb.net/Database?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
}).then(() => console.log('Connected to MongoDB'))

const getRecipes = async () => {
	return await recipe.find({})
}

const getRecipe = async (title) =>{
	return await recipe.findOne({title: title})
}

const postRating = async (rating, title) => {
  rec = await getRecipe(title)
  //console.log(rec)
  rec.rating.push(Number(rating))
  rec.save()
  console.log(rec)
}

app.get('/api/recipe', async (req, res) => {
   let recipe
   
   recipe = await getRecipes() 
   res.json(recipe)
})

app.get('/api/recipe/:title', async (req, res) => {
  const title = req.params.title

  let recipe
 
  recipe = await getRecipe(title)
  console.log(recipe)
  res.json(recipe)
})

app.post('/api/rating', async (req, res) => {
  const rating = req.body.rating
  const title = req.body.title
  console.log(title)
  await postRating(rating, title)
  res.send()
 
})

app.use(express.static('public'))

app.listen(3000)
