const express = require('express');
const app = express();

const mongoose = require('mongoose')

const Recipe = require('./models/recipe');

mongoose.connect("mongodb+srv://ebuysse:Hello123@cluster0.gr43c.mongodb.net/Recipes?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}).then(() => console.log('Connected to MongoDB'));

app.use(express.static('public'));

const getRecipes = async () => {
    try {
        recipes = await Recipe.find({});
        return recipes

    } catch (err){
        console.log(err)
    }
};
const getOneRecipe = async name => {
    try {
        recipe = await Recipe.findOne({title: name});
        return recipe;

    } catch (err){
       console.log(err)
    }

};
const postRating = async (name, rating) => {
    try {

       let doc = await Recipe.findOneAndUpdate({title: name}, {ratings: ratings.push(rating)}, {new: true})
       return "rating posted"

    } catch (err){
             console.log(err)
         }
};

app.get('/api/recipe', async (req, res) => {
        res.status(200);
        recipes = await getRecipes()

        res.json(recipes)
});
app.get('/api/recipe/:name', async (req, res) =>  {
        const name = req.params.name.split(":")[1];
        res.status(200);
        let recipe
        if (name === undefined)
            recipes = await getRecipes()
        else
            recipes = await getOneRecipe(name)

        res.json(recipes)

});
app.post('/api/rating', async (req, res) => {
    res.status(200);
    const rating = req.body.rating
    const name = req.body.title

    const result = await postRating(name, rating)
    res.json(result)
});


app.listen(3000, function(){
    console.log("info",'Server running on port ' + 3000);
});





