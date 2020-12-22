const express = require('express')
const bodyParser = require("body-parser")
const app = express()
const mongoose = require('mongoose')
const Recipe = require('./models/recipe');

mongoose.connect("mongodb+srv://dbUser:1234..!ahqQ@annabootcamp.tsiur.mongodb.net/recipe?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
}).then(() => console.log('Connected to MongoDB'))

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(bodyParser.json())
app.use(express.static("../"))

const getRecipes = async () => {
	return await Recipe.find({})
}

const getRecipe = async (recipe) => {
	return await Recipe.find({_id: recipe})
}

const newRating = async (id, rating) => {
	return await Recipe.updateOne( 
  	{ _id : id },
  	{ $push: { ratings: rating } })
}

app.get("/api/recipe", async (req, res) => {
	res.json(await getRecipes())
})

app.get("/api/recipe/:name", async (req, res) => {
	const name = req.params.name
	if(typeof name === undefined || name.length === 0){
		res.json(await getRecipes())
	}
	console.log(name)
	res.json(await getRecipe(name))
})

app.post("/api/rating", async (req, res) => {
	if(typeof req.body.id === undefined || typeof req.body.rating === undefined){
		res.json(await getRecipes())
	}
	await newRating(req.body.id, req.body.rating)
	res.send(`Rating for ${req.body.food}, ${req.body.rating}/5, has been posted.`)
	
})

app.listen(3001)
