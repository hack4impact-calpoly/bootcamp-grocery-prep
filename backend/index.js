const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const recipeEnpoints = require('./api/recipe.js');
const ratingEndpoints = require('./api/rating.js');

app.use(express.static(__dirname + '/../'));
app.use(bodyParser.json());
app.use('/api/recipe', recipeEnpoints);
app.use('/api/rating', ratingEndpoints);

// default page
app.get('/', (req, res) => {
    res.status(200);
    res.sendFile('index.html');
});

app.listen(3000);
