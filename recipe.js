const countElements = document.getElementsByClassName('ingredient');

document.addEventListener('click', event => {
   if (event.target.id === '-'){
      incrementServings(-1);
   }
   else if (event.target.id === '+'){
      incrementServings(1);
   }
}
);

function incrementServings(increment){
   const numServings = document.getElementById('num_servings');
   count = old = Number(numServings.textContent);
   count += increment;

   if (count < 1){return;}
   numServings.textContent = count; /*change serving #*/
   

   Array.prototype.map.call(countElements, item => { /*change ingredients*/
      item.textContent = +((item.textContent / old) * count ).toFixed(3);
   }
   );
}