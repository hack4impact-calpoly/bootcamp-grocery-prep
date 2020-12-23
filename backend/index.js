const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser")
const app = express();

const Foods = require("./models/schema.js");

app.use(bodyParser.json()) //replaced confusion with JSON

app.use("/", express.static("../rawHTMLFiles"))
app.use("/scripts", express.static("../scripts"))
app.use("/images", express.static("../images"))

mongoose.connect("mongodb+srv://TestUser:Testing1234@cluster0.c3xdk.mongodb.net/Recipes?retryWrites=true&w=majority", {
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

app.get("/api/recipe", async (req, res) => {
    res.status(200);
    const food = await Foods.find({});
    res.json(food);

});

app.get("/api/recipe/random", async (req, res) => {
    res.status(200)
    const randomPage = ["GoldenMilk", "appleSmoothie", "egg", "tofuScramble"]
    const index = Math.floor(4 * Math.random());
    const food = await Foods.find({"foodTitle" : randomPage[index]})
    res.json(food)

});

app.get("/api/recipe/:name", async (req, res) => {  //async because database request
    const recipeName = req.params.name

    if (typeof recipeName === undefined || recipeName.length === 0){
        res.status(400);
        res.send(`ERROR: \nNo recipe named ${recipeName}!`)
    }
    else{
        res.status(200);
        const food = await Foods.find({"foodTitle" : recipeName})
        if (food.length == 0){
            res.send("No food in database!")
        }
        else{
            res.json(food)
        }
    }
});

app.post("/api/rating", async (req, res) => {
    res.status(200);
    const food = await Foods.find({"foodTitle" : req.body.food});
    if (food.length == 0){
        res.send("No food in database!")
    }
    else{
        await Foods.updateOne(
            {"foodTitle" : req.body.food},
            {"$push" : { "ratings" : Number(req.body.rating)}}
        )
        res.send("Rating added!")
    }

});

app.get("/api/cart", (req, res) => {
    res.status(200);
})

app.post("/api/cart", (req, res) => {
    res.status(200);
    cart.push([req.body.food, req.body.quantity]);
    res.send(`${req.body.quantity} quantity of ${req.body.food}s added to cart`)
})

app.listen(3001);
