const express = require('express')
const app = express();
const port = 3000;
const path = require('path');

app.use('/', express.static(path.join(__dirname, '../')));
app.use('/lessons', express.static(path.join(__dirname, '../lessons')));
app.use('/lessons/images',express.static(path.join(__dirname, '../lessons/images')) )

const mongoose = require('mongoose')
const databaseURL = "mongodb+srv://noximus:password1234@cluster0.jnln5.mongodb.net/Crafts?retryWrites=true&w=majority";

mongoose.connect(databaseURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
}).then(() => console.log('Connected to MongoDB'))

const schema = new mongoose.Schema({
  title: String,
  description: String,
  picture: String,
  items_needed: [Object],
  instructions: [String],
  amount: Number,
  ratings: [Number]
}, {collection : "crafts"})

const Craft = mongoose.model('crafts', schema)

module.exports = Craft

app.get('/', (req, res) => {
    res.status(200);
    res.sendFile('/index.html');
});

app.get('/api/craft', (req, res) => {
  res.status(200)
   Craft.find({},  "title", function (err, crafts) {
        if (err) return handleError(err);
        // console.log(crafts)
	    // sends list of crafts
        res.send(crafts);
    });
})


app.get('/api/craft/:name', (req, res) => {
  const name = req.params.name
  res.status(200)
    Craft.findOne({ 'title': name },  function (err, craft) {
        if (err) return handleError(err);
        console.log('Here are the instructions for: ', craft.title);
        // console.log(craft);
        res.send(craft);
    });
})

app.post('/api/rating', (req, res) => {
  const rating = req.body.rating
  const id = req.body.id
  res.status(200)
      Craft.findOne({ 'title': id },  function (err, craft) {
        if (err) return handleError(err);
        let ratings = craft.ratings
        ratings.push(rating)
        craft.ratings = ratings
        craft.save()
        // console.log(craft);
    });
  res.send(`rating of ${rating} recieved for ${id}`)
})


app.get('/api/cart', (req, res) => {
  res.status(200)
  res.send(`here are the items in your cart`)
    
})

app.post('/api/cart', (req, res) => {
  res.status(200)
  const quantity = req.body.quantity
  const id = req.body.id
  res.send(`${quantity} orders of craft ${id} added to cart`)
})

app.listen(port, () => {
  console.log(`app listening on port ${port}!`)
});

