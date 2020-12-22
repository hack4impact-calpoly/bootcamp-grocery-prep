const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(express.static(__dirname + "/../public"));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello world! in index.js');
})

app.get('/api/recipe', (req, res) => {
    res.send('list of recipes');
})

app.get('/api/recipe/:name', (req, res) => {
    let name = req.params.name.substring(1);
    res.send(`instruction for ${name} was requested`);
})

app.post('/api/rating', (req, res) => {
    const rating = req.body.rating;
    const id = req.body.id;
    res.send(`rating of ${rating} for recipe ${id}`);
})

app.listen(3000, function() {
    console.log('we are on');
})