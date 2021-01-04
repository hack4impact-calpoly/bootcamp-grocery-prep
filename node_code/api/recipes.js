const express = require('api/node_modules/express');
const { response } = require('express');
const router = express.Router();

app.get('/api/recipes', (request, response) => {
    console.log("get recipes has ran")
    response.json('List of recipes asked for');
});

app.get('/api/recipes/:name', (request, response) => {
    console.log("get :name has ran")
    response.json('Instructions for name requested');
});

app.post('/api/rating', (request, response) => {
    console.log("post rating has ran")
    response.json('rating of ' + request + 'recived for recipe');
});