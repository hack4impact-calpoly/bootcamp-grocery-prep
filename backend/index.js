const express = require("express");
const bodyParser = require("body-parser")
const app = express();

app.use(bodyParser.json()) //replaced confusion with JSON

app.use("/", express.static("../rawHTMLFiles"))
app.use("/scripts", express.static("../scripts"))
app.use("/images", express.static("../images"))

const cart = [];

app.get("/api/recipe", (req, res) => {
    res.status(200)
    res.send('list of recipes requested')

});

app.get("/api/recipe/random", (req, res) => {
    res.status(200)
    res.send('random recipe requested')

});

app.get("/api/recipe/:name", (req, res) => {
    const recipeName = req.params.name

    if (typeof recipeName === undefined || recipeName.length === 0){
        res.status(400);
        res.send(`ERROR: \nNo recipe named ${recipeName}!`)
    }
    else{
        res.status(200);
        res.send(`instructions for ${recipeName} requested`)
    }
});

app.post("/api/rating", (req, res) => {
    res.status(200);
    res.send(`rating of ${req.body.rating} received for recipe ${req.body.food}`)
});

app.get("/api/cart", (req, res) => {
    res.status(200);
    res.send(cart)
})

app.post("/api/cart", (req, res) => {
    res.status(200);
    cart.push([req.body.food, req.body.quantity]);
    res.send(`${req.body.quantity} quantity of ${req.body.food}s added to cart`)
})

app.listen(3000);
