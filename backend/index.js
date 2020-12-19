const express = require('express')
const bodyParser = require('body-parser')
const app = express()

const mongoose = require('mongoose')

const Recipe = require('./models/cookbook.js')

mongoose.connect("mongodb+srv://Jon:77888624@bootcamp.r8lif.mongodb.net/bootcampdata?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  }).then(() => console.log('Connected to MongoDB'))

app.use(bodyParser.json())

// Serving up index.html
app.use(express.static('../'))

// endpoint
app.get('/api/recipe', async (req, res) => {
    res.status(200)
    // res.send('List of recipes requested!')
    const recipe_docs = await getAllRecipe()
    res.json(recipe_docs)
    console.log(recipe_docs)
})

// another endpoint
app.get('/api/recipe/:name', async (req, res) => {
    const recipeName = req.params.name 

    if (typeof recipeName === undefined || recipeName.length === 0) {
        res.status(400)
        res.send('Error: no name specified')
    }
    else {
        res.status(200)
        // res.send(`Instructions for ${recipeName} requested`)
        console.log(recipeName)
        const recipe_doc = await getRecipe(recipeName)
        res.json(recipe_doc)
        console.log(recipe_doc)
    }
})

app.post('/api/rating', async (req, res) => {
    console.log(req.body.id, req.body.rating)
    res.status(200)
    await postNewRating(req.body.id, req.body.rating)
    console.log('Posted new rating')
    res.send(`Rating of ${req.body.rating} received for recipe ${req.body.id}`)
})

// CRUD
const getRecipe = async recipe_name => {
    return await Recipe.find({
        title: recipe_name
    })
}

const getAllRecipe = async () => {
    return await Recipe.find({})
}

const postNewRating = async (name, rating) => {
    console.log(name)
    return await Recipe.update(
        {title: name},
        {$push: {ratings: rating}}
    )
}

app.listen(3000)