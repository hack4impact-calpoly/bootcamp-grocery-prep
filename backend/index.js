const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

mongoose.connect("mongodb+srv://mReed:H4IGPDatabase@groceryprepcluster.jxgph.mongodb.net/GroceryPrepRecipes", {
   useNewUrlParser: true, 
   useUnifiedTopology: true,
   useFindAndModify: false,
   useCreateIndex: true
 }).then(() => console.log('Connected to MongoDB'))

const recipe = require('../models/standardSchema');

app.use(bodyParser.json())


app.use((req, res, next) => {
   req.timestamp = new Date()
   console.log(req.timestamp)
   next()
})

const getAllRecipes = async () => {
   return await recipe.find({})
}

const getSpecifiedRecipe = async (name) => {
   return await recipe.find({title : name})
}

app.get('/api/recipe', async (req, res) => {
   res.status(200)
   let recipes
   recipes = await getAllRecipes()
   res.json(recipes)
})

app.get('/api/recipe/random', (req, res) => {
   res.status(400)
   res.send("Here is a random Recipe!")
})

app.get('/api/recipe/:name', async (req, res) => {
   const name = req.params.name

   res.status(400)
   let recipe
   recipe = await getSpecifiedRecipe(name)
   res.json(recipe)
})

app.get('/api/cart', (req, res) => {
   res.status(400)
   res.send("Here is your cart!")
})

app.post('/api/rating', async (req, res) => {
   res.status(200)
   let doc
   doc = await recipe.findOne({_id : req.body._id})
   doc.ratings.push(req.body.rating)
   doc.save()
   res.json(doc)
})

app.post('/api/cart', (req, res) => {
   console.log(req.body.id, req.body.rating)
   res.status(200)
   res.send("Cart Filled!")
})

app.use(express.static('public'))

app.listen(3000)

