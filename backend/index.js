const express = require("express")
const app = express()
const recipeAPI = require('./api/recipeAPI.js')
const mongoose = require('mongoose')

// MongoDB Connection
const dbURL = "mongodb+srv://Vance:sGkh9rbWwBBEAtjc@cluster0.5lpyb.mongodb.net/bootcamp-grocery-prep?retryWrites=true&w=majority";
mongoose.connect(dbURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  }).then(() => console.log('Connected to MongoDB'))

// CORS Stuff
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Express Routes
app.use(express.static('../public'))
app.use(express.json())
app.use(recipeAPI)

// Express Connection
app.listen(4000)