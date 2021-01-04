const express = require("express")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const app = express()

app.use(bodyParser.json())

app.use(express.static("public"))

const Recipe = require("./recipe.js")

mongoose.connect("mongodb+srv://nichkhtan:CH50VD3DFQbugRlZ@recipe-data.jtgtw.mongodb.net/Recipes?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  }).then(() => console.log('Connected to MongoDB'))


const getAllRecipe = async () => {
    return await Recipe.find({}, "_id title")
}

const getRecipe = async (name) => {
    return await Recipe.find({title: name})
}

const postRating = async (id, rating) => {
    return await Recipe.findByIdAndUpdate({_id : id}, {$push: {ratings: rating}})
}

app.get("/api/recipe", async (req, res) => {
    res.status(200)
    res.send("list of recipes requested")
    recipelist = await getAllRecipe()
    console.log(recipelist)
})

app.get("/api/recipe/:name", async (req, res) => {
    const name = req.params.name
    console.log(name)

    if(typeof name === undefined || name.length === 0){
        res.status(400)
        res.send("error, no recipe found :(")
    }

    res.status(200)
    recipe = await getRecipe(name)
    res.send(`Instructions for ${name} requested`)
    console.log(recipe)
})

app.post("/api/rating", async (req, res) => {
    const id = req.body.id
    const rating = +(req.body.rating)

    res.status(200)
    res.send(`rating of ${rating} recieved for recipe ${id}`)
    await postRating(id, rating)
})

app.listen(3000)