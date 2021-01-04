const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
const recipe = require('./schema.js');
const url = 'mongodb+srv://archiejones:A1m8c0j2!@hack4impactchefwebsite.kjs99.mongodb.net/Hack4ImpactChefWebsite?retryWrites=true&w=majority';
app.use(express.static('../bootcamp-grocery-prep'));
app.use(bodyParser.json());


app.get('/api/recipe', async(req, res) => {
    res.status(200)
    let recipies = await recipe.find({})
    res.send(recipies)
    return recipies
    
})
app.get('/api/recipe/random',( req, res) => {
    res.status(200)
    res.send('random recipe requested')
})
app.get('/api/recipe/:name', async(req, res) => {
    res.status(200);
    const name = req.params.name
    if(name === undefined || name.length === 0){
        res.status(400)
        res.send("Error: no recipe requested")
    }
    else{
        let recipies = await recipe.find({title : name})
        res.send(recipies)
        return recipies
    }
})

app.post('/api/rating', async(req, res) => {
    res.status(200);
    const rTitle = req.body.title;
    const rRating = req.body.rating;
    let newRatings;
    await recipe.find({title : rTitle}, 'ratings', (err,recipe) =>{
        if(err){console.log(err)}else{
            newRatings = recipe[0].ratings;
            newRatings.push(rRating);
        }
    })
    await recipe.updateOne({title:rTitle}, {ratings:newRatings}, (err, data) =>{
        if(err){console.log(err)}else{
            res.send('success')
        }
    })
    
})

app.listen(3001)