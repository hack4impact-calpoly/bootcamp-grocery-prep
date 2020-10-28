const express = require('express')
const app = express();
const port = 3000;
const path = require('path');

app.use('/', express.static(path.join(__dirname, '../')));
app.use('/lessons', express.static(path.join(__dirname, '../lessons')));
app.use('/lessons/images',express.static(path.join(__dirname, '../lessons/images')) )


app.get('/', (req, res) => {
    res.status(200);
    res.sendFile('/index.html');
});

app.get('/api/recipe', (req, res) => {
  res.status(200)
  res.send(`list of recipes requested`)
})

app.get('/api/recipe/random', (req, res) => {
  res.status(200)
  res.send(`random recipe requested`)
})

app.get('/api/recipe/:name', (req, res) => {
  const name = req.body.name
  res.status(200)
  res.send(`instructions for ${name} requested`)
})

app.post('/api/rating', (req, res) => {
  const rating = req.body.rating
  const id = req.body.id
  res.status(200)
  res.send(`rating of ${rating} recieved for ${id}`)
})


app.get('/api/cart', (req, res) => {
  const name = req.params.name
  res.status(200)
  res.send(`here are the items in your cart`)
})

app.post('/api/cart', (req, res) => {
  const quantity = req.body.quantity
  const id = req.body.id
  res.status(200)
  res.send(`${quantity} orders of recipe ${id} added to cart`)
})





app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
});

