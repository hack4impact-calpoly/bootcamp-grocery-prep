const express = require('express');
const recipes = require('../models/recipeSchema');
const recipeDb = require('../database/recipeDatabase.js');

const router = express.Router();

router.get('/', async (req, res) => {
    res.status(200);
    const allRecipes = await recipes.find();
    res.send(allRecipes);
});

router.get('/random', async (req, res) => {
    res.status(200);
    const allRecipes = await recipes.find();
    const randomIndex = Math.floor(Math.random() * allRecipes.length);
    res.send(allRecipes[randomIndex]);
})

router.get('/:name', async (req, res) => {
    const name = req.params.name;
    const selectedRecipe = await recipes.find({ name: req.params.name });
    res.status(200);
    res.send(selectedRecipe);
})

module.exports = router;