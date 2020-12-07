const express = require("express")
const app = express()
const bodyParser = require('body-parser')
//const cors = require("cors");
 
app.use(bodyParser.json());
//app.use(cors());

app.get('/api/recipe', (req, res) => {
    res.status(200);
    res.send("list of recipes requested");
    console.log("list of recipes requested");
})

app.get('/api/recipe/:name', (req, res) => {
    res.status(200);
    const name = req.params.name;
    res.send('instructions for ' + name + ' requested');
    console.log('instructions for ' + name + ' requested'); 
})

app.post('/api/rating', (req, res) => { 
    res.status(200);
    const id = req.body.id;
    const rating = req.body.rating
    res.send("Sent!");
    console.log("rating: " + rating + " received for: " + id);
    res.status(200);
})

app.listen(3000) 