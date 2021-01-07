const express = require('express');
const router = express.Router();

router.get('/recipes', (request, response) => {
    console.log("get recipes has ran")
    response.json('List of recipes asked for');
});

router.get('/recipes/:name', (request, response) => {
    console.log("get :name has ran")
    response.json('Instructions for name requested');
});

router.post('/rating', (request, response) => {
    console.log("post rating has ran")
    const id = request.body.id;
    const rating = request.body.rating;
    response.json("Rating of " + rating + ' recived for recipe id of ' + id);
});

module.exports = router 