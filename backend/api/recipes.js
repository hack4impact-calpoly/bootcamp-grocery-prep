//  api/recipes.js

const express = require('express')
const router = express.Router()

router.get('/api/recipe', (req, res) => {
	        res.status(200)
	        res.send('list of recipes requested')
})

module.exports = router
