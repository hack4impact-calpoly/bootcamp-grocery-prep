const express = require("express")
const bodyParser = require('body-parser')
const app = express()
const mongoose = require('mongoose')
const url = "mongodb+srv://josh:test123@test.xrvsw.mongodb.net/Test?retryWrites=true&w=majority"

mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
}).then(() => console.log('Connected to MongoDB'))

app.use(bodyParser.json())
app.use(express.static('../frontend'))
app.use('/images', express.static('images'))

const Recipe = require("./models/recipe")

async function getAll() {
   return await Recipe.find({})
}

async function getOne(name) {
   return await Recipe.findOne({title: name})
}

async function postRating(recipe) {
   return await recipe.save()
}

app.get("/api/recipe", async (req, res) => {
   let recipes = await getAll()

   res.status(200)
   res.send(recipes)
})

app.get("/api/recipe/:name", async (req, res) => {
   var name = req.params.name

   let recipe = await getOne(name)

   res.status(200)
   res.send(recipe)
})

app.post("/api/rating", async (req, res) => {
   let recipe = await getOne(req.body.id)
   recipe.ratings.push(req.body.rating)
   postRating(recipe)
   res.status(200)
   res.send(`Posted your ${req.body.rating} star rating for the ${req.body.id} recipe!`)
})

app.listen(3000)

