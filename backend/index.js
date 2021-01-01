const express = require('express')
const bodyParser = require('body-parser')
const app = express()

const mongoose = require('mongoose')

const Recipe = require('./models/recipeSchema')

mongoose.connect("mongodb+srv://dsatrawada:C63XHEbpYUvufUbr@cluster0.ycmwa.mongodb.net/recipes?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}).then(() => console.log('Connected to MongoDB'))

app.use('/', express.static('../'))

app.use(bodyParser.json())

app.use((req, res, next) => {
    req.timestamp = new Date()
    console.log(req.timestamp)
    next()
})

const getRecipes = async () => {
    return Recipe.find({})
}

const getRecipe = async (name) => {
    return Recipe.find({"title": name})
}

const postRating = async (title, rating) => {
    Recipe.findOne({"title": title}, function (err, recipe) {
        recipe.ratings.push(Number(rating))
        recipe.save()
    })
}

app.get('/api/recipe', async (req, res) => {
    let recipes = await getRecipes()
    res.send(recipes)
    res.status(200)
})

app.get('/api/recipe/:name', async (req, res) => {
    const recipeName = req.params.name

    if (typeof recipeName === undefined || recipeName.length === 0){
        res.status(400)
        res.send(`Error: NO RECIPE NAME`)
    }
    let recipe = await getRecipe(recipeName)
    res.send(recipe)
    res.status(200)
})

app.post('/api/rating', async (req, res) => {
    const rating = req.body.rating
    const name = req.body.title

    if (typeof rating === undefined || rating.length === 0){
        res.status(400)
        res.send(`Error: NO RATING`)
    }

    if (typeof name === undefined || name.length === 0){
        res.status(400)
        res.send(`Error: NO NAME`)
    }

    await postRating(name, rating)
    res.send('Rating of ' + rating + ' recieved for ' + name)
    res.status(200)
})

app.listen(3000)
