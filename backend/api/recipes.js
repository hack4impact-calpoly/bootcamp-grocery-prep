const express = require('express');
const router = express.Router();


const Recipe = require("../models/recipeSchema.js")


const getRecipe = async () => {
    return Recipe.find()
}

const getOneRecipe = async (name) => {
    return Recipe.find({title: name})
}

const updateRating = async (id, rating) => {
    let doc = await Recipe.findById(id)
    let rateArray = doc.ratings
    rateArray.push(rating)
    // console.log(rateArray)
    // console.log("********************************")
    // console.log(rating)
    return Recipe.updateOne({_id: id}, {ratings: rateArray})
}

router.get("/recipe", async (req,res) => {
    res.status(200)
    res.send("All recipes requested")
    console.log("ALL RECPIES")
    recipes = await getRecipe()
    // console.log(recipes)
})
  
  
router.get("/recipe/:name", async (req,res) =>{
    res.status(200)
    let name = req.params.name
    recipe = await getOneRecipe(name)
    console.log(`instructions for ${name} requested`)
    //console.log(JSON.stringify(recipe))
    console.log(recipe)
    res.json(recipe)
    // console.log("ONE RECIPE____________________________")
    // console.log(recipe)
})
  
router.post("/rating", async (req, res) =>{
    res.status(200)
    let rating = req.body.rating
    let id = req.body.id

    const updatedDoc = await updateRating(id, rating)
    //res.json(updatedDoc)
    res.send(`rating of ${rating} for recipe ${id}`)
})


module.exports = router