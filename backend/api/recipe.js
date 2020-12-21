//  api/recipe.js

const express = require('express')
const router = express.Router()

router.get('/api/recipe/:name', (req, res) => {
	        const recipeName = req.params.name

	        res.status(200)
	        res.send(`instructions for ${recipeName} requested`)
})

module.exports = router
