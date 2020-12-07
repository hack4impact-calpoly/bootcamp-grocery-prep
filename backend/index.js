const express = require('express')
const app = express()

app.get('/', (req, res) => {
  res.send('Hello world!')
})

app.use(express.static('public'))

app.listen(3000)
