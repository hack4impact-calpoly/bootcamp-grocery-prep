const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(express.static(__dirname + "/../public"));
app.use(bodyParser.json());


app.get('/api/recipe', (req, res) => {
    res.status(200);
    res.send('list of recipes');
})

app.get('/api/recipe/:name', (req, res) => {
    const name = req.params.name;

    res.status(200);
    res.send(`instruction for ${name} was requested`);
})

app.post('/api/rating', (req, res) => {
    const rating = req.body.rating;
    const id = req.body.id;

    if (typeof rating === 'undefined' || rating.length === 0) {
        res.status(400);
        res.send('error: no rating:(');
    }
    if (typeof id === "undefined" || id.length === 0) {
        res.status(400);
        res.send('error: no id:(');
    }

    res.status(200);
    res.send(`rating of ${rating} for recipe ${id}`);
})

app.listen(3000, function() {
    console.log('we are on');
})