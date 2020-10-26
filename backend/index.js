const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

app.use('/', express.static(path.join(__dirname, '../')));
app.use('/img', express.static(path.join(__dirname, '../img')));
app.use('/recipes',express.static(path.join(__dirname, '../recipes')) )
app.use(bodyParser.json());

// default page
app.get('/', (req, res) => {
    res.status(200);
    res.sendFile('/index.html');
});

app.get('/api/recipe', (req, res) => {
    res.status(200);
    res.send('getting all recipes');
})

app.get('/api/recipe/random', (req, res) => {
    res.status(200);
    res.send('getting a random recipe');
})

app.get('/api/recipe/:name', (req, res) => {
    res.status(200);
    const name = req.params.name;
    res.status(200);
    res.send('getting the ' + name + ' recipe');
})

app.post('/api/rating', (req, res) => {
    res.status(200);
    console.log(req.body.id + ', rating --> ' + req.body.rating);
    res.send('rating of ' + req.body.rating + ' for ' + req.body.id + ' was received!');
})

app.get('/api/cart', (req, res) => {
    res.status(200);
    res.send('here are the items in your cart');
})

app.post('/api/cart', (req, res) => {
    res.status(200);
    console.log(req.body.id + ', quantity --> ' + req.body.quantity);
    res.send( req.body.quantity + ' of ' + req.body.id + ' was added to the cart!');
})


app.listen(3000);
