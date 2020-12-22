const express = require('express');
const router = express.Router();

router.get("/recipe", (req,res) => {
    res.status(200)
    res.send("list of recipes requested")
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