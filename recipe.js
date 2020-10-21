const countElements = document.getElementsByClassName('count');

document.addEventListener('click', event => {
  if (event.target.id === 'dec')
    updateIngredients(-1);
  if (event.target.id === 'inc')
    updateIngredients(1);
});

function updateIngredients(direction){
  const currentServings = document.getElementById("servingCount");
  const servingCount = Number(currentServings.textContent);
  const updatedServings = servingCount + direction;

  if(updatedServings < 1)return;

  currentServings.textContent = updatedServings;

  Array.prototype.map.call(countElements, e => {
    const itemServing = Number(e.getAttribute('base'));
    e.textContent = +(itemServing * updatedServings).toFixed(2);
  })
}
