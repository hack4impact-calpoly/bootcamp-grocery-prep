const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const mongoose = require('mongoose');

const Recipe = require('./models/recipeSchema');

mongoose.connect("mongodb+srv://MyUser:12345@cluster0.ypgf5.mongodb.net/Database?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
}).then(() => console.log('Connected to MongoDB'));

app.use(express.static(__dirname + "/../public"));
app.use(bodyParser.json());


app.get('/api/recipe', async (req, res) => {
    let recipes = await Recipe.find();
    res.status(200);
    res.json(recipes);
})

app.get('/api/recipe/:name', async (req, res) => {
    const name = req.params.name;
    let recipe = await Recipe.find({
        "title": name
    })
    res.status(200);
    res.json(recipe);
})

app.post('/api/rating', async (req, res) => {
    const rating = req.body.rating;
    const id = req.body.id;
    const response = await Recipe.update(
        {"title": id},
        {$push: {ratings: rating}},
    );
    if (typeof rating === 'undefined' || rating.length === 0) {
        res.status(400);
        res.end('error: no rating:(');
    }
    if (typeof id === "undefined" || id.length === 0) {
        res.status(400);
        res.end('error: no id:(');
    }

    res.status(200);
    res.send(`rating of ${rating} for recipe ${id} posted`);
})

app.listen(3000, function() {
    console.log('we are on 3000');
})