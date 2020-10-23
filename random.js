const URL = 'https://3blzgwgi13.execute-api.us-west-2.amazonaws.com/Live/recipe';
const recipeHash = window.location.hash.substring(1);
const getParam = recipeHash !== undefined ? '?id=' + recipeHash : null;


let recipeData;

const getRecipe = () => {
   fetch(URL + getParam)
   .then(response => response.json())
   .then(data => setRecipe(data));
}


getRecipe();


document.addEventListener('click', event => {
   if (event.target.id === 'post-rating'){
      postRating();
      console.log ("posting some rating");
   }
   });

const postRating = () => {
  
   const ratingSelect = document.getElementById('select-rating');
   const rating = +(ratingSelect.options[ratingSelect.selectedIndex].value);
 
   const data = {
     id: recipeData._id,
     rating: rating
   };
 
   fetch(URL, {
     method: 'POST',
     body: JSON.stringify(data)
   })
   .then(() => {
     recipeData.ratings.push(rating);
     document.getElementById('rating').innerText = avgRatings(recipeData.ratings);
   });
   
  
}

const avgRatings = (ratings) => {

  let sum = 0;
  for ( var i in ratings){
    sum += +(ratings[i]);
  }
  return (sum / ratings.length).toFixed(2);
}



const setRecipe = (data) => {
   console.log(data);
   recipeData = data;
   
   document.location.hash = data._id;
      
   document.getElementsByClassName('title')[0].innerText = data.title;
   document.getElementsByClassName('food-img')[0].src = data.picture;
   document.getElementById('num_servings').innerText = data.servings;
   document.getElementsByClassName('desc')[0].innerText = data.desc;
   
   
   const ingredients = document.getElementById('ingredients');
   for (const [key, value] of Object.entries(data.ingredients)) {
     const item = document.createElement('li');
     const count = document.createElement('span');
 
     count.className = 'ingredient';
     count.innerText = value;
 
     item.appendChild(count);
     item.innerHTML += " " + key;
     ingredients.appendChild(item);
   }
 
   data.instructions.forEach(instruction => {
     const item = document.createElement('li');
     item.innerText = instruction;
     document.getElementById('instructions').appendChild(item);
   });

  document.getElementById('rating').innerText = avgRatings(data.ratings)


   
}

