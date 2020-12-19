const express = require('express');
const app = express();
const mongoose = require('mongoose')
const Recipe = require('./models/recipe');
const bodyParser = require('body-parser');

app.use(express.static('./'));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));


mongoose.connect("mongodb+srv://ebuysse:Hello123@cluster0.gr43c.mongodb.net/Recipes?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}).then(() => console.log('Connected to MongoDB'));


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
const postRating = async (id, newRatings) => {
    try {

        let doc = await Recipe.findOneAndUpdate({_id: id}, {ratings: newRatings}, {new: true});
        return doc

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
        const name = req.params.name.split(':')[1];

        res.status(200);

        if (name === undefined)
            recipes = await getRecipes()
        else
            recipes = await getOneRecipe(name)

        res.json(recipes)

});
app.post('/api/recipe/:name', async (req, res) => {

    res.status(200);
    const rating = parseInt(req.body.rating);
    const id = req.body.id;
    const name = req.body.name;

    const _ratings = await getOneRecipe(name);
    const newRatings = _ratings.ratings.concat(rating);

    const result = await postRating(id, newRatings);
    res.json(result);
});

app.listen(3001, function(){
    console.log("info",'Server running on port ' + 3001);
});





