const mongoose = require('mongoose')

const recipe = new mongoose.Schema({
    title: String,
    //required: true,
    desc: String,
    picture: String,
    ratings: Array,
    servings: Number,
    ingredients:{

    },
    instructions: String 

})


const Example = mongoose.model('recipes', recipe)

module.exports = Example