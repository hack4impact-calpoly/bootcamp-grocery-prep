  
document.addEventListener('click', event => {
   if (event.target.id === 'sub') 
      updateCount(-1);
   if (event.target.id === 'add') 
      updateCount(1);
})

const updateCount = (num) => {
   const currServings = document.getElementById('serving-count');
   const updatedServings = Number(currServings.textContent) + num;
   
   if(updatedServings < 1) 
      return;
   currServings.textContent = updatedServings;
   updateIngredients(updatedServings);

}

const updateIngredients = (updatedServing) => {
   const ingredientCounts = document.getElementsByClassName('count');
   let i;
   for(i = 0; i < ingredientCounts.length; i++) {
      const itemServing = Number(ingredientCounts[i].getAttribute('base'));
      ingredientCounts[i].textContent = +(itemServing * updatedServing); 
   }  
}
