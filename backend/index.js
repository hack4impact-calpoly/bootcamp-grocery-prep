const express = require("express")
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const Recipe = require("./models/recipeModel.js")

const app = express();
app.use(bodyParser.json());
app.listen(3000);
 
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
    return Recipe.findOne({'title': name});
}

const postRating = async (rating, id) => {
    Recipe.findOne({'title': id}, function (err, recipe) {
        if (err)
            return handleError(err);
        let ratings = recipe.ratings
        ratings.push(Number(rating))
        recipe.ratings = ratings
        recipe.save()
    });
}

app.get('/api/recipe',  async (req, res) => {
    res.status(200);
    let recipes;
    recipes = await getRecipes();
    res.send(recipes);
});

app.get('/api/recipe/:name', async (req, res) => {
    res.status(200);
    const name = req.params.name;
    let recipe;
    recipe = await getRecipeByName(name);
    res.send(recipe);
})

app.post('/api/rating', async (req, res) => { 
    console.log(req.body)
    const id = req.body.id;
    const rating = req.body.rating
    await postRating(rating, id);
    res.status(200);
    res.send("rating: " + rating + " received for: " + id);
})
 