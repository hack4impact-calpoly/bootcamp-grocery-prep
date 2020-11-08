const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
 
const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
 
app.listen(3000, () =>
    console.log('Example app listening on port 3000!'),
);

app.get("/", (request, response) => {
    response.send("Hello from Emily's recipe site");
});

app.get("/api/recipe", (request, response) => {
    response.send("List of recipes coming right up");
});

app.get("/api/recipe/random", (request, response) => {
    response.send("Random recipe coming right up!");
});
  
app.get("/api/recipe/:name", (request, response) => {
    let name = request.params.name
    response.send("Request for recipe " + name + " coming right up");
});

app.get("/api/cart", (request, response) => {
    response.send("Retrieving your cart");
});

// Need id and quantity
app.post("/api/cart", (request, response) => {
    console.log(request)
    let id = request.body.id
    let quantity = request.body.quantity
    response.send("You added " + quantity + " items with id " + id + " to your cart");
});

// Need id and rating
app.post("/api/rating", (request, response) => {
    let id = request.body.id
    let rating = request.body.rating
    response.send("Adding a " + rating + " star rating for your recipe with id " + id);
});