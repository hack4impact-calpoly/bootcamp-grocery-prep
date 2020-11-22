const express = require("express")
const bodyParser = require('body-parser')
const app = express()

app.use(bodyParser.json())
app.use(express.static('../frontend'))
app.use('/images', express.static('images'))

app.get("/api/recipe/:name", (req, res) => {
   var name = req.params.name
   
   res.status(200)
   res.send(`Your ${name} recipe is coming soon!`)
})

app.get("/api/recipe", (req, res) => {
   res.status(200)
   res.send("I will send the recipes when I know how!")
})

app.post("/api/rating", (req, res) => {
   console.log(req.body.id, req.body.rating)
   res.status(200)
   res.send(`Posted your ${req.body.rating} star rating for the ${req.body.id} recipe!`)
})

app.listen(3000)


