const express = require("express")
const bodyParser = require("body-parser")
const recipeEndpoints = require("./api/recipes.js")
const app = express()

app.use(express.static("../html"))
app.use("/api", recipeEndpoints)

app.listen(3000)
