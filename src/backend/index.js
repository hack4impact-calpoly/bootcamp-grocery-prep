const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const path = require("path")

app.use(bodyParser.json())

app.use("", express.static(path.join(__dirname, "..")))

app.use("/images", express.static(path.join(__dirname, "..", "..", "images")))

app.get("/", (req, res) => {
   res.status(200)
   res.sendFile(path.join(__dirname, "..", "index.html"))
})

app.get("/api/recipe", (req, res) => {
   res.status(200)
   res.send("list of all recipes request has been got")
   console.log("list of all recipes requested")
})

app.get("/api/recipe/random", (req, res) => {
   res.status(200)
   res.send("random recipe request has been got")
   console.log("random recipe requested")
})

app.get("/api/recipe/:name", (req, res) => {
   const name = req.params.name
   if (typeof name === undefined || name.length === 0) {
      res.status(400)
      res.send("error: where's the name bro?")
   }
   res.status(200)
   res.send(`instructions for ${name} request has been got`)
   console.log(`instructions for ${name} requested`)
})

app.post("/api/rating", (req, res) => {
  res.status(200)
  res.send(`rating of ${req.body.rating} for ${req.body.id} ` +
  `request has been posted`)
  console.log(`rating of ${req.body.rating} received for recipe `
  + `${req.body.id}`)
})

app.get("/api/cart", (req, res) => {
   res.status(200)
   res.send("items of your cart incoming")
   console.log("here are the items in your cart")
})

app.post("/api/cart", (req, res) => {
   res.status(200)
   res.send(`${req.body.quantity} of recipe ${req.body.id} added to da cart`)
   console.log(`${req.body.quantity} of recipe ${req.body.id} added to cart`)
})
app.listen(3000)
