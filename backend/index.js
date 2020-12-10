express = require('express')
bodyParser = require('body-parser')
app = express()

app.use(bodyParser.json())

app.get('/api/recipe', (request, response) => {
    console.log('Successful request for all recipe data')
    response.status(200)
    response.send('Your request for all recipe data was successful.')
})

app.get('/api/recipe/:name', (request, response) => {
    const name = request.params.name
    // if (name.trim().length === 0) {
    //     console.log('Unsuccessful recipe data request')
    //     response.status(400)
    //     response.send('ERROR: recipe name not specified')
    // }
    // else {
        console.log(`Successful request for ${name} recipe data`)
        response.status(200)
        response.send(`Your request for ${name} recipe data was successful.`)
    // }
})

app.post('/api/rating', (request, response) => {
    const id = request.body.id
    const rating = request.body.rating
    console.log(`Rating of ${rating} for recipe ${id} received`)
    response.status(200)
    response.send(`Your rating of ${rating} for recipe ${id} has been received.`)
})

app.listen(3000)