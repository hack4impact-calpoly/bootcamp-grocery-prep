const express = require('express')
const bodyParser = require('body-parser')
const app = express()

const mongoose = require('mongoose')
const Recipe = require('../models/schema.js')

app.use("/", express.static('../public'))

mongoose.connect("mongodb+srv://MixelPixel:uP1z!d4jSqWA&4v@cluster0.qn19y.mongodb.net/H4I?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
}).then(() => console.log('Connected to MongoDB'))

app.use(express.static('html'))
app.use(bodyParser.json())

const getAllRecipes = async () => {
    return await Recipe.find({})
}

const getRecipe = async (recipeName) => {
    console.log(recipeName)
    return await Recipe.find({
        name: recipeName
    })
}

const postRating = async (id, rating) => {
    return await Recipe.updateOne({_id: id}, {$push: {ratings: rating}})
}

app.get('/api/recipe', async (req, res) => {
    const allRecipes = await getAllRecipes()
    res.send(allRecipes)
})

app.get('/api/recipe/:name', async (req, res) => {
    const recipeName = req.params.name
    let recipe = await getRecipe(recipeName)
    console.log(recipe)
    res.send(recipe)
})

app.post('/api/rating', async (req, res) => {
    const id = req.body.id
    const rating = req.body.rating
    await postRating(id, rating)
    res.status(200)
    res.send("Rating Posted!")
})



app.listen(3000)