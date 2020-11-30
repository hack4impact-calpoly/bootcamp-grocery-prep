const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const mongoose = require('mongoose')
const uri = "mongodb+srv://admin:AtlasPassword1@cluster0.vmmxb.mongodb.net/Hack4Impact?retryWrites=true&w=majority";
mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("Successfully connected to mongodb")
});
const recipeSchema = new mongoose.Schema({
  title: String,
  description: String,
  picture: String,
  instructions: [String],
  servings: Number,
  ratings: [Number]
}, {collection : "recipes"})
const Recipe = mongoose.model('Recipe', recipeSchema)

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
 
app.listen(8000, () =>
    console.log('Example app listening on port 8000!'),
);

app.get("/", (request, response) => {
    response.send("Hello from Emily's recipe site");
});

app.get("/api/recipe", (request, response) => {
    console.log("List of recipes coming right up");
    Recipe.find({},  "title", function (err, recipes) {
        if (err) return handleError(err);
        // Prints "Space Ghost is a talk show host".
        console.log(recipes)
        response.send(recipes);
      });
});

app.get("/api/recipe/random", (request, response) => {
    let recipes = ["Breakfast Burrito", "Cheerios", "Avocado Toast", "Pizza", "Salmon", "Salad"]
    let index = Math.floor(Math.random() * Math.floor(6));
    Recipe.findOne({ 'title': recipes[index] },  function (err, recipe) {
        if (err) return handleError(err);
        console.log('%s Recipe coming right up', recipe.title);
        response.send(recipe);
    });
});
  
app.get("/api/recipe/:name", (request, response) => {
    let name = request.params.name
    Recipe.findOne({ 'title': name },  function (err, recipe) {
        if (err) return handleError(err);
        console.log('%s Recipe coming right up', recipe.title);
        response.send(recipe);
    });
});

app.get("/api/cart", (request, response) => {
    response.send("Retrieving your cart");
});

// Need id and quantity
app.post("/api/cart", (request, response) => {
    console.log(request)
    let id = request.body.id
    let quantity = request.body.quantity
    response.send("You added " + quantity + " items with id " + id + " to your cart");
});

// Need id and rating
app.post("/api/rating", (request, response) => {
    console.log(request.body)
    let id = request.body.id
    let rating = request.body.rating
    Recipe.findOne({ 'title': id },  function (err, recipe) {
        if (err) return handleError(err);
        console.log('Adding %s star rating to %s Recipe', rating, recipe.title);
        let ratings = recipe.ratings
        ratings.push(rating)
        recipe.ratings = ratings
        recipe.save()
        console.log(recipe);
    });
    response.send("Added a " + rating + " star rating for your recipe with id " + id);
});