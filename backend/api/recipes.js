//recipes.js -- for endpoint logic
const bodyParser = require("body-parser");
const express = require('express');
const router = express.Router();
const recipeSchema = require('../models/recipeSchema.js');

//some bodyParser middleware
router.use(bodyParser.json());

/*
`GET - /api/recipe` - "list of recipes requested"

`GET - /api/recipe/:name` - "instructions for `name` requested"

`POST - /api/rating` - "rating of `rating` received for recipe `id`
*/


/*
`GET - /api/recipe`
*/
router.get('/',  async (req, res) => {
  // res.json({ 'recipes': ["list of recipes requested"] });
   const recipes = await recipeSchema.find({});
   res.status(200);
   res.json(recipes);
});

/*
`GET - /api/recipe/:name`
*/
router.get('/:id', async (req, res) => {
   const recipe_name = req.params.id;
   //ex: localhost:3000/api/recipe/croissant

   const recipe = await recipeSchema.find({title: recipe_name});

  //Error check
   if (recipe.length === 0){
      res.status(400);
      res.send(`error: recipe for${recipe_name}  not found :O`);
   }else{
      res.status(200);
 //  res.send(`instructions for ${recipe_name} requested`);
      res.json(recipe);
   }
});
/*
`POST - /api/rating` 
*/
router.post('/', async (req, res) => {
   const rate = req.body.rating;
   const dish = req.body.food;

   //console.log(req.body);

   if (rate < 0){
      res.status(400);
      res.send("rating must not be negative");
   
   }


   const recipe = await recipeSchema.find({title: dish});

  //Error check
   if (recipe.length === 0){
      res.status(400);
      res.send(`error: recipe for${dish}  not found :O`);
   }else{
      const result = await recipeSchema.update(
         {title: dish}, //find by
         {$push: {ratings: rate}}//what to change
      );
  
      res.status(200);
      res.send(`Rating of ${rate} received for ${dish}.`);

   }
});

module.exports = router;
