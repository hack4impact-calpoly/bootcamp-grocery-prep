const countElements = document.getElementsByClassName('count');

document.addEventListener('click', event => {
  if (event.target.id === 'sub')
    updateServings(-1);
  if (event.target.id === 'add')
    updateServings(1);
});

const updateServings = (direction) => {
  const currentServings = document.getElementById('serving-count');
  const servingCount = Number(currentServings.textContent);
  const newServings = servingCount + direction;

  if (newServings < 1) return;
  currentServings.textContent = newServings;

  Array.prototype.map.call(countElements, e => {
    e.textContent = +((e.textContent/servingCount) * newServings).toFixed(2)
  })
}