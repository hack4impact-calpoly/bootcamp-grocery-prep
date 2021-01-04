const express = require('express')
const app = express()
const path = require('path');

app.use(express.static('../public')) 

app.get('/', (req, res) => {
    res.send('Hello world! 2.0')   
})

app.listen(3000)
