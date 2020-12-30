

const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
//   _id: ObjectId,
   title: String,
   desc: String,
   picture: String,
   ratings: [Number],
   servings: Number,
   ingredients: {
      type: Map,
      of: Number
   },
   instructions: [String]


}, {collection: 'recipe_collection'});

const recipeModel = mongoose.model('recipe_collection', recipeSchema);

module.exports = recipeModel;
