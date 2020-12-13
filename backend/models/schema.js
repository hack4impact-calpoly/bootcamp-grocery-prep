const mongoose = require('mongoose');

const FoodSchema = new mongoose.Schema({
  "foodTitle": String,
  "foodDesc": String,
  "picturePath": String,
  "ratings": Array,
  "servingSize": Number,
  "ingredients": { //keys are always Strings
    "type": Map,
    "of": Number,
  },
  "instructions":Array
}, {
  collection: "Foods"
});

const Foods = mongoose.model('Foods', FoodSchema);

module.exports = Foods;