const express = require("express");
const app = express();

app.listen(3000);
app.use(express.static("."))

app.get("/", (req, res) => {
    res.status(200);
    res.send("index.html");
})

app.get("/home", (req, res) => {
    res.status(200);
    res.send("hello!!")
})