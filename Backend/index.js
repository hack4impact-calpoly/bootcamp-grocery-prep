const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const app = express()
const Recipe = require('./models/recipeSchema')

mongoose.connect("mongodb+srv://shadhussain12:Doohickey12@gettingstarted.k4vqa.mongodb.net/Recipes?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}).then(() => console.log('Connected to MongoDB'))

app.use(bodyParser.json())
app.use(express.static('public'))

const getRecipes = async () => {
    return await Recipe.find({})
}

app.get('/', (req, res) => {
    res.status(200)
    res.send("Welcome to Grocery Prep!")
})

//gets grocery list
app.get('/api/recipe', async (req, res) => {
    res.status(200)
    recipes = await Recipe.find({})
    console.log(recipes)
    res.json(recipes)
})

//gets specific grocery item
app.get('/api/recipe/:recipeName', async (req, res) => {
    const recipeName = request.params.name
    res.status(200)
    recipe = await Recipe.findOne({'title': recipeName})
    res.send(recipe )
})

//posts rating
app.post('/api/rating', async (req, res) => {
    const id = req.body.id
    const rating = req.body.rating
    res.status(200)
    await Recipe.findByIdandUpdate(id, {
        $push: {'ratings': rating}
    })
    res.send('Rating of ' + rating + " received for recipe " + id)
})

app.get('/api/RandomRecipe', (request, response) => {
    response.send('Random recipe requested')
})

app.get('/api/cart', (request, response) => {
    response.send('Here are the items in your cart')
})

app.post('/api/cart', (req, res) => {
    const id = req.body.id
    const quantity = req.body.quantity
    res.status(200)
    res.send(quantity + " of recipe " + id + " added to cart")
})

app.listen(3002)
