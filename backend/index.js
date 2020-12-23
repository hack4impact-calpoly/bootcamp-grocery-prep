
const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const app = express()
const { response } = require('express');
const Recipe = require('./models/recipe')

const db = mongoose.connect("mongodb+srv://chef:recipe@cluster0.lxz00.mongodb.net/recipedb?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}).then(() => console.log('Connected to MongoDB'))

app.use(bodyParser.json())
app.use(express.static("../public"))
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/api/recipe', async (req, res) => {
    try 
    {
        var result = await Recipe.find({});
        return res.json(result);
    }
    catch (error)
    {
        res.status(500).send(error);
    }
})
app.get('/api/recipe/:name', async (req, res) => {
    const name = req.params.name
    try 
    {
        var result;
        if (typeof name === undefined || name.length === 0)
        {
            result = await Recipe.find({});
        }
        result = await Recipe.find({title: name})
        // await Recipe.find({ title: name}) 
        res.json(result);
    }
    catch (error)
    {
        res.status(500).send(error);
    }
})
app.get('/api/rating/:name', async (req, res) => {
    const name = req.params.name
    var result = await Recipe.find({ title: name})
    res.send(result[0].ratings)
    // res.log("rating of rating received for recipe id")
})

app.post('/api/rating', async (req, res) => {
    try 
    {
        if (typeof req.body.id === undefined || typeof req.body.rating === undefined)
        {
            res.status(500);
            return await Recipe.find({});  
        }
        var result = await Recipe.updateOne({ _id: req.body.id }, { $push: { ratings: req.body.rating } })
        res.status(200);
        res.send(`Rating for ${req.body.id}, ${req.body.rating}/5, has been posted.`) 
        }
    catch (error)
    {
        res.status(500).send(error);
    }
})

app.listen(3001)


