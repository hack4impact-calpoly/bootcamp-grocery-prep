const express = require('express')
const app = express()
const bodyParser = require('body-parser')

const mongoose = require('mongoose')
const url = "mongodb+srv://stick:smolstick@recipes.dodo5.mongodb.net/sticksCafe?retryWrites=true&w=majority"
const Recipe = require('./models/recipe')


app.use(bodyParser.json())
//app.use(express.static('public'))
//app.use("api/recipe/random", express.static("../recipe/random.html"))
//app.use('/css', express.static('css'))
app.use(express.static('html'))

mongoose.connect(url, {
    useNewUrlParser: true,
    newUnifiedTopolody: true,
    useFindAndModify: false,
    useCreateIndex: true
}).then(()=> console.log('Connected to MongoDB'))

//get all recipes
const getRecipes = async () => {
    return await Recipe.find({})
}

//get one recipe
const getRecipe = async (name) => {
    return await Recipe.findOne({'title': name})
}

const postRating = async (rating, title) => {
    Recipe.findOne({'title': title}, function (err, recipe) {
        if (err) 
            return handleError(err);
        recipe.ratings.push(Number(rating))
        recipe.save()
    });
}

app.get('/api/recipe', async (req, res) => {
    res.status(200)

    let recipes = await getRecipes()

    res.json(recipes)
})

//app.get('/api/recipe/random', (req, res) => {
//    console.log("random recipes requested")
//    res.status(200)
//    app.use('api/recipe/random', express.static("public"))
    //res.send("random recipe requested")
//})

app.get('/api/recipe/:name', async (req, res) => {
    const name = req.params.name

    let recipe

    recipe = await getRecipe(name)

    //console.log('instructions for ' + name + ' requested')
    res.status(200)
    res.json(recipe)
})

app.post('/api/rating', async (req, res) => {
    const title = req.body.title
    const rating = req.body.ratings
    if (rating < 1 || rating > 5) {
        throw 'Invaid Rating'
    }
    await postRating(rating, title);
    //console.log("rating of " + req.body.rating + " recieved for recipe with id " + req.body.id)
    res.status(200)
    res.send("rating of " + rating + " recieved for recipe with id " + title)
})

app.get('/', (req, res) => {
    res.status(200)
    res.send(200)
})

app.listen(3000)
console.log('Serving running on port 3000')
