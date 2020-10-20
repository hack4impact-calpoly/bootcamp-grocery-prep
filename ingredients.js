const countElements = document.getElementsByClassName('count');

document.addEventListener('click', event => {
  if (event.target.id === 'subtract')
    updateServings(-1);
  if (event.target.id === 'add')
    updateServings(1);
});

const updateServings = (direction) => {
  const currentServings = document.getElementById('num-servings');
  const servingCount = Number(currentServings.textContent);
  const newServings = servingCount + direction;

  if (newServings < 1) return;
  currentServings.textContent = newServings;

  Array.prototype.map.call(countElements, e => {
    const itemServing = Number(e.getAttribute('base'));
    e.textContent = +(itemServing * newServings).toFixed(2);
  })
}