const express = require('express');
const app = express();



app.get('/api/recipe', (req, res) => {
    res.status(200);
    res.send('list of recipes requested')
});
app.get('/api/recipe/:name', (req, res) => {
    const name = req.params.name;

    res.status(200);
    res.send(`instructions for ${name} requested`)
});
app.get('/api/recipe/random' , (req, res) => {
    res.status(200);
    res.send('random recipe requested')
});

app.post('/api/rating', (req, res) => {
    res.status(200);
    res.send('rating of rating received for recipe id')
});
app.get('/api/cart', (req, res) => {
    res.status(200);
    res.send('here are the items in your cart')
});
app.get('/api/cast', (req, res) => {
    res.status(200);
    res.send('quantity of recipe id added to cart')
});


app.listen(3000);