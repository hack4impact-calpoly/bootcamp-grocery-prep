//  api/rating.js

const express = require('express')
const bodyParser = require('body-parser')
const router = express.Router()

router.use(bodyParser.json())

router.post('/api/rating', (req, res) => {
	        const id = req.body.id
	        const rating = req.body.rating

	        res.status(200)
	        res.send(`rating of ${rating} received for recipe ${id}`)
})

module.exports = router
