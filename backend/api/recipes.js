const express = require('express');
const router = express.Router();


const Recipe = require("../models/recipeSchema.js")


const getRecipe = async () => {
    return Recipe.find()
}

const getOneRecipe = async (name) => {
    return Recipe.find({title: name})
}


router.get("/recipe", async (req,res) => {
    res.status(200)
    res.send("All recipes requested")
    recipes = await getRecipe()
    console.log(recipes)
})
  
  
router.get("/recipe/:name", async (req,res) =>{
    res.status(200)
    let name = req.params.name
    recipe = await getOneRecipe(name)
    res.send(`instructions for ${name} requested`)
    console.log("ONE RECIPE____________________________")
    console.log(recipe)
})
  
router.post("/rating", (req, res) =>{
    res.status(200)
    let rating = req.body.rating
    let id = req.body.id
    res.send(`rating of ${rating} for recipe ${id}`)
})


module.exports = router