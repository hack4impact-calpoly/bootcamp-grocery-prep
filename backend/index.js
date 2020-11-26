const express = require("express")
const app = express()

app.use(express.static('../public'))
app.use(express.json())

app.get('/api/recipie', (req, res) => {
    res.send('List of recipes requested');
})

app.get('/api/recipie/:name', (req, res) => {
    res.send(`Instructions for ${req.params.name} requested`);
})

app.post('/api/rating', (req, res) => {
    res.send(`Rating of ${req.body.rating} received for recipie ${req.body.id}`);
})

app.listen(3000)