const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
const Recipe = require('./models/recipeSchema')

mongoose.connect("mongodb+srv://skylerdee3:whateverheh@initialmilestone4.7k7kp.mongodb.net/bootcamprecipe?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  }).then(() => console.log('Connected to MongoDB'))

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Hello world!')
})
  
app.use(express.static('../'))

const getRecipes = async () => {
    return Recipe.find({})
}

const getRecipe = async (name) => {
    return Recipe.find({"_id": name})
}

const postRating = async (id, rating) => {
    Recipe.findByIdAndUpdate(id, {
        $push: {"ratings": rating}
    })
    Recipe.save()
}

/*app.get('/api/recipe', async (req, res) => {
    const name = req.params.name
    let recipes
    if (name === undefined) {
        recipes = await getRecipes()
    } else {
        recipes = await getRecipe(name)
    }
    res.send(recipes)
    res.send("ay")   
})*/
app.get('/api/recipe', async (req, res) => {
    let recipes = await getRecipes()
    res.send(recipes)
})

app.get('/api/recipe/:name', async (req, res) => {
    const name = req.params.name
    if (typeof name === undefined || name.length === 0) {
        res.send('try again buddy')
    }
    let recipe = await getRecipe(name)
    res.send(recipe)
})

app.post('/api/rating', async (req, res) => {
    const rating = req.body.rating
    const id = req.body.id
    if (typeof rating === undefined || rating.length === 0 || typeof id === undefined || id.length ===0) {
        res.send('please try again')
    }
    await postRating(id, rating)
    res.send(`rating of ${rating} received for ${id}`)
})

app.listen(3000)
