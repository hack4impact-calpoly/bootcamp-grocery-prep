const express = require('express');
const router = express.Router();


const Recipe = require("../models/recipeSchema.js")


const getRecipe = async () => {
    return Recipe.find()
}


router.get("/recipe", async (req,res) => {
    res.status(200)
    res.send("All recipes requested")
    recipe = await getRecipe()
    console.log(recipe)
})
  
  
router.get("/recipe/:name", (req,res) =>{
    res.status(200)
    let name = req.params.name
    res.send(`instructions for ${name} requested`)
})
  
router.post("/rating", (req, res) =>{
    res.status(200)
    let rating = req.body.rating
    let id = req.body.id
    res.send(`rating of ${rating} for recipe ${id}`)
})


module.exports = router