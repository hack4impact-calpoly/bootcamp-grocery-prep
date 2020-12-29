//  app.js

const express = require('express')
const app = express()

const recipesEndpoint = require('./api/recipes.js')
const recipeEndpoint = require('./api/recipe.js')
const ratingEndpoint = require('./api/rating.js')

app.use((req, res, next) => {
	  res.header("Access-Control-Allow-Origin", "*");
	  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	  next();
});

//app.use('/api/recipe', recipeEndpoints) 
app.use(recipesEndpoint)
app.use(recipeEndpoint)
app.use(ratingEndpoint)

app.listen(3001)
