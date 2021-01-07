const express = require('express')
const app = express()
const recipes = require('./api/recipes')
// const path = require('path');

app.use(express.static('../public')) 

app.use(express.json())
app.use('/api', recipes)


app.get('/', (req, res) => {
    res.send('Hello world! 2.0')   
})

app.listen(3000)
