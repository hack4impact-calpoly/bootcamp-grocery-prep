const mongoose = require('mongoose');
const url = 'mongodb+srv://archiejones:A1m8c0j2!@hack4impactchefwebsite.kjs99.mongodb.net/Hack4ImpactChefWebsite?retryWrites=true&w=majority';

mongoose.connect(url,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
    })
    .then(() => console.log("connected"))


const recipeSchema = new mongoose.Schema({
    "title": String,
    "desc": String,
    "picture": String,
    "ratings": [Number],
    "servings": Number,
    "ingredients": {},
    "instructions": [String]
})

const recipe = mongoose.model('recipe', recipeSchema);
module.exports = recipe;

