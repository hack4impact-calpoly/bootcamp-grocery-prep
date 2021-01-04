const { response } = require('express');
const express = require('express')
const app = express();
// let router = express.Router();

// const recipeEndpoints = require('./api/recipe.js');

// app.use('/api/recipe/', recipeEndpoints);

app.get('/api/app', (request, response) => {
    console.log("get has ran")
    response.json('test_get');
});



// router.get('/api/recipe', (req, res) => {
//     console.log('/api/recipe called')
//     res.json({
//         'message': 'recipe response yay'
//     });
// });

// router.get('/api/recipe/:name', (req, res) => {
//     console.log('/api/recipe name called')
//     res.json({
//         'message': 'recipe name response yay'
//     });
// });

// router.post('/api/rating', (req, res) => {
//     console.log('/api/rating called')
//     res.json({
//         'message': 'rating response yay'
//     });

    
// });