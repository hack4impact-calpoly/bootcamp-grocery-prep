const mongoose = require('mongoose')

const flanSchema = new mongoose.Schema({
  "title": "Flan",
    "image": "../../imgs/Flan.jpg",
    "rating": "[]",
    "serving": {
        "$numberInt": "1"
    },
    "ingredients": {
        "cup of white sugar": {
            "$numberInt": "1"
        },
        "large eggs": {
            "$numberInt": "3"
        },
        "can of sweetened condenced milk": {
            "$numberInt": "1"
        },
        "can of evaporated milk": {
            "$numberInt": "1"
        },
        "tbp of vanilla extract": {
            "$numberInt": "1"
        }
    },
    "steps": ["Preheat oven to 350 degrees F (175 degrees C).", "In a medium saucepan over medium-low heat, melt sugar until liquefied and golden in color. Carefully pour hot syrup into a 9 inch round glass baking dish, turning the dish to evenly coat the bottom and sides. Set aside. Be careful don't burn yourself. It will hurt if the sugar touches your skin.", "In a large bowl, beat eggs. Beat in condensed milk, evaporated milk and vanilla until smooth. Pour egg mixture into baking dish. Cover with aluminum foil.", "Find a larger pan that the baking dish can fit in. After placing the baking dish in the pan, add water to the pan (just enough for the water to be 1/4 -1/2 of the baking dish). Make sure no water goes inside the flan mixture!", "Bake in preheated oven 60 minutes. Let cool completely. Enjoy :)"]
})

const flan = mongoose.model('Recipe', flanSchema)

module.exports = flan
