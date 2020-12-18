const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const DATABASE_URL = "mongodb+srv://recipes:Nine1234@grocery-prep-cluster.x4hms.mongodb.net/<dbname>?retryWrites=true&w=majority";

const Recipe = require("./models/recipe");

const app = express();

app.use(express.static("public"));
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

const getRecipeName = async(title) => {
    return await Recipe.find({
        title: title
    });
}

const createRating = async(id, rating) => {
    return new Recipe({
        _id: id,
        rating: rating
    }).save();
}

/*
    Recipe endpoints
*/

app.get('/api/recipe', (req, res) => {
    let recipes = await getRecipes();
    res.json(recipes);
});

app.get('/api/recipe/:name', (req, res) => {
    const name = req.body.name;
    let recipes = await getRecipeName(name);
    return recipes;
});

app.post('/api/rating', (req, res) => {
    const rating = req.body.rating;
    const id = req.body.id;
    
    const recipe = await createRating(id, rating);
    res.json(recipe);
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
    const id = req.body.id;
    const quantity = req.body.quantity;
    res.status(200);
    res.send(quantity + ' of recipe' + id + ' added to cart');
})

app.listen(3000, function(){
    console.log("Server running on port 3000");
});


