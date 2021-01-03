const express = require('express');
const recipes = require('../models/recipeSchema');
const recipeDb = require('../database/recipeDatabase.js');

const router = express.Router();

router.post('/', async (req, res) => {
    res.status(200);
    let selectedRatings;
    const recipe = await recipes.findOne({name : req.body.name}).then( (r) => { selectedRatings = r.ratings; });

    if (selectedRatings.length >= 1) {
        if (selectedRatings[0] === null) {
            selectedRatings[0] = parseFloat(req.body.rating);
        }
        else {
            selectedRatings.push(parseFloat(req.body.rating));
        }
    }
    await recipes.updateOne({name : req.body.name}, {ratings: selectedRatings});

    res.send('rating of ' + req.body.rating + ' for ' + req.body.name + ' was posted!');
})

module.exports = router;