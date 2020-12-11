const express = require('express');
const router = express.Router();
const Recipe = require('../models/recipe.js')

router.get('/api/recipe', async (req, res) => {
    const allRecipes = await Recipe.find({})
    res.send(allRecipes)
})

router.get('/api/recipe/:name', async (req, res) => {
    const name = req.params.name.replace(/_/g, ' ')
    const recipe = await Recipe.findOne({title: name})
    res.send(recipe);
})

router.post('/api/rating', async (req, res) => {
    try {
        const rating = req.body.rating
        if (!rating || rating < 1 || rating > 5) {
            throw 'Invalid Rating (rating must be between 1 and 5)'
        }

        await Recipe.findByIdAndUpdate(req.body.id, {
            $push: { ratings: rating}
        })
    }
    catch (err) {
        res.status(400)
        res.send('Invalid Id or Rating')
        return
    }

    res.send('Rating Successfully Added')
})

module.exports = router;