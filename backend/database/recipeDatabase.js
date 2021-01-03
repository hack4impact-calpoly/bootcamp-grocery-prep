const mongoose = require('mongoose');


const dbURL = 'mongodb+srv://qmona:4monasteria@cluster0.oy3eh.mongodb.net/bootcamp?retryWrites=true&w=majority';
const recipeDb = mongoose.connect(dbURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}).then( 
        () => console.log('Connected to MongoDB') 
);

module.exports = recipeDb;