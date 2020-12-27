const express = require("express")
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const Recipe = require("./models/recipeModel.js")
//const cors = require("cors")
//app.use(cors())

const app = express();
app.use(bodyParser.json());
app.listen(3001);
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
 
mongoose.connect("mongodb+srv://ameliabruscia:dbUserPassword@recipes.9x58i.mongodb.net/Recipes?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
}).then(() => console.log('Connected to MongoDB'))

const getRecipes = async () => {
    return Recipe.find({});
}

const getRecipeByName = async (name) => {
    return Recipe.findOne({'_id': name});
}

const postRating = async (rating, id) => {
    Recipe.findOne({'_id': id}, function (err, recipe) {
        if (err)
            return handleError(err);
        let ratings = recipe.ratings
        ratings.push(Number(rating))
        //recipe.ratings = ratings
        recipe.save()
    });
}

app.get('/api/recipe',  async (req, res) => {
    res.status(200);
    let recipes;
    recipes = await getRecipes();
    res.json(recipes);
    //res.send(recipes);
});

app.get('/api/recipe/:name', async (req, res) => {
    res.status(200);
    const name = req.params.name;
    let recipe;
    recipe = await getRecipeByName(name);
    res.json(recipe);
})

app.post('/api/rating', async (req, res) => { 

    const id = req.body.id;
    const rating = req.body.rating
    await postRating(rating, id);
    res.status(200);
    //res.send("rating: " + rating + " received for: " + id);
})
 