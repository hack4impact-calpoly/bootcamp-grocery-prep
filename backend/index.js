const express = require('express')
const app = express()


//app.use(express.static("./../public"))

app.use(express.static("./.."))
// app.get('/', (req, res) => {
//   res.send('Hello world!')
// })

// app.get('/hola/:page', (req, res) => {
//   let page = req.params.page
//   res.send(page)
// })

app.listen(3000)