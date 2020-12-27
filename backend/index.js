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
app.use(express.static('public'))

mongoose.connect(url, {
    useNewUrlParser: true,
    newUnifiedTopolody: true,
    useFindAndModify: false,
    useCreateIndex: true
}).then(()=> console.log('Connected to MongoDB'))

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

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

    // console.log('instructions for ' + name + ' requested')
    res.status(200)
    res.json(recipe)
})

app.post('/api/rating', async (req, res) => {
    const title = req.body.title
    const rating = req.body.rating
    if (rating < 1 || rating > 5) {
        throw 'Invaid Rating'
    }
    await postRating(rating, title);
    console.log("rating of " + req.body.rating + " recieved for recipe with title " + req.body.title)
    res.status(200)
    res.send("rating of " + rating + " recieved for recipe with id " + title)
})

app.get('/', (req, res) => {
    res.status(200)
    res.send(200)
})

app.listen(4000, 'localhost')
console.log('Serving running on port 4000')
