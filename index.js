const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const DATABASE_URL = "mongodb+srv://recipes:Nine1234@grocery-prep-cluster.x4hms.mongodb.net/grocery-prep?retryWrites=true&w=majority";

const Recipe = require("./models/recipe");

const app = express();

app.use(express.static("frontend"));
app.use(bodyParser.urlencoded({extended: true}));

mongoose.connect(DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}).then(() => console.log('Connected to MongoDB'))

const getRecipes = async() => {
    return await Recipe.find({});
}

const getRecipeByName = async(title) => {
    return await Recipe.find({
        title: title
    });
}

const appendRating = async(name, rating) => {
    return await Recipe.updateOne(
        {title: name},
        {$push: {ratings: rating}}
    );
}

/*
    Recipe endpoints
*/

app.get('/api/recipe', async (req, res) => {
    let recipes = await getRecipes();
    res.json(recipes);
});

app.get('/api/recipe/:name', async (req, res) => {
    const name = req.params.name;
    let recipes = await getRecipeByName(name);
    res.json(recipes);
});

app.post('/api/rating', async (req, res) => {
    console.log(req.body.id, req.body.rating);
    await appendRating(req.body.id, req.body.rating);
    res.send("Successfully posted rating");
});

app.get('/api/recipe/random', (req, res) => {
    res.status(200);
    res.send('random recipe requested');
})

app.get('/api/cart', (req, res) => {
    res.status(200);
    res.send('here are the items in your cart');
})

app.post('/api/cart', (req, res) => {
    const id = req.params.id;
    const quantity = req.body.quantity;
    res.status(200);
    res.send(quantity + ' of recipe' + id + ' added to cart');
})

app.listen(3000, function(){
    console.log("Server running on port 3000");
});
