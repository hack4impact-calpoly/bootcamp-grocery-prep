const express = require("express");//import express
const bodyParser = require("body-parser");
const app = express(); //initializes express

//for splitting enpoint logic into separate file
//import the module eproted from ./api/recipes.js
//Milestone 3
const recipeEndpoints = require('./api/recipes.js');

//database stuff - Milestone 4
const mongoose = require("mongoose");

//some bodyParser middleware
app.use(bodyParser.json());

//using imported module when we navigate to /api/recipe
app.use('/api/recipe/', recipeEndpoints);
app.use('/api/rating/', recipeEndpoints);


//middleware example: timestamp of traffic
app.use( (req, response, next) => {
   req.timestamp = new Date();
   console.log(req.timestamp);
   next();
}
);

//Milestone 4 - connect to dtabase
mongoose.connect("mongodb+srv://marissadarnell:SecurePassword@cluster0.myy6h.mongodb.net/recipe_data?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
}).then(() => console.log('Connected to MongoDB'))


//serve something static (image)
//somehow this just knows to serve index.html
app.use('/images', express.static('../images') );
  //    '..' is where to look to serve from relative to pwd
  //    '/' is the <empty> path in the url 



//serve something static (image)
//somehow this just knows to serve index.html
app.use('/', express.static('../') );
  //    '..' is where to look to serve from relative to pwd
  //    '/' is the <empty> path in the url 


app.get('/hello/:name', (var1, var2) => {
   const name = var1.params.name;
   /*localhost:3000/hello/namehere*/

   var2.status(200);
   //var2.send('Hello, ' + name + '!'); 
   // the bottom one works with the ${} b/c the special quotes`~`
   var2.send(`Hello, ${name} !`);
}
);


app.get('/', (request, result) => {
   result.status(200);
   result.send("Hello world");
}
);


/*when we make a POST request to a /rate URL,
 *client makes request
 *server gives response
 */
app.post('/rate', (req, resp) => {
      //let's just log the given food and its rating
   console.log(req.body);
   console.log(req.body.food, req.body.rating);
   resp.status(200);
   resp.send("Rating posted!!!");
});

/* enter into postman body:
{
   "food": "hummus",
   "rating": "5"
}
*/



app.listen(3000); //tell app to listen on port 3000
