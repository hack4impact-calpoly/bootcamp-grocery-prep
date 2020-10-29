
//takes in the ingredients that have the class 'count'
const ingredients = document.getElementsByClassName('count');

document.addEventListener('click', event => {
  if (event.target.id === 'minus')
    updateServings(-1);
  if (event.target.id === 'plus')
    updateServings(1);
});

const updateServings = (dir) => {
  //servingAmount will get the id 'serving-count' -- on html it keeps count of servings
  const servingAmount = document.getElementById('serving-count');
  //servingAmountNumber gets the string that servingAmount recieved and casts it to number
  const servingAmountNumber = Number(servingAmount.textContent);
  //adds the amount of serving to the direction that the button is pressed (minus or plus)
  const newServings = servingAmountNumber + dir;

  //makes sure that the newServings does not go below 1
  if (newServings < 1) return;
  //updates the number displayed on the html recipe website
  servingAmount.textContent = newServings;

  Array.prototype.map.call(ingredients, e => {
    //get the base attribute (default ingredient amount)
    //updates the ingredient quantity amount
    e.textContent = +(Number(e.getAttribute('base')) * newServings).toFixed(2);
  })
}