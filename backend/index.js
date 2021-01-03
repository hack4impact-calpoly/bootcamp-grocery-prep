const express = require('express')
const bodyParser = require('body-parser')
const app = express()

const mongoose = require('mongoose')
const Recipe = require('./models/schema.js')

app.use("/", express.static('../public'))

mongoose.connect("mongodb+srv://MixelPixel:uP1z!d4jSqWA&4v@cluster0.qn19y.mongodb.net/H4I?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
}).then(() => console.log('Connected to MongoDB'))

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(express.static('html'))
app.use(bodyParser.json())

const getAllRecipes = async () => {
    return await Recipe.find({})
}

const getRecipe = async (recipeName) => {
    return await Recipe.findOne({
        _id: recipeName
    })
}

const postRating = async (id, rating) => {
    return await Recipe.updateOne({_id: id}, {$push: {ratings: rating}})
}

app.get('/api/recipe', async (req, res) => {
    const allRecipes = await getAllRecipes();
    let condensed = allRecipes.map(recipe => {return {_id: recipe._id, name: recipe.name, desc: recipe.desc, picture: recipe.picture }})
    res.status(200)
    res.send(condensed)
})

app.get('/api/recipe/:name', async (req, res) => {
    const recipeName = req.params.name
    let recipe = await getRecipe(recipeName)
    res.send(recipe)
})

app.post('/api/rating', async (req, res) => {
    const id = req.body.id
    const rating = req.body.rating
    if(typeof rating !== 'number'){
        res.status(400)
        res.send("ERROR: Rating value is not a number!")
    }
    else if (rating > 5 || rating < 0) {
        res.status(400)
        res.send("ERROR: Rating value outside of 0 to 5 range!")
    }
    else {
        await postRating(id, rating)
        res.status(200)
        res.send("Rating Posted!")
    }

})



app.listen(3000)