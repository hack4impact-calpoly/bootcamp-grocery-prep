const express = require('express');
const router = express.Router();

// router.get('../api/recipe', (req, res) => {
//     res.json({ 'recipes': [...] });
// })
// res.use(express.static('../public/'))
router.get('/', (req, res) => {
    res.use(express.static('../public/'))
})
// router.get('/', (req, res) => {
//     // res.json({ 'recipes': [...] });
//     res.use(express.static('../public/'))
// })

// router.get('/:id', (req, res) => {

// })

module.exports = router;