document.addEventListener('click', event => {
  if (event.target.id === 'subtract') updateCount(-1);
  if (event.target.id === 'add') updateCount(1);
})

const updateCount = (dir) => {
  const newServings = Number(document.getElementById('servings').textContent) + dir;

  if (newServings < 1) return;
    document.getElementById('servings').textContent = newServings;

  Array.prototype.map.call(document.getElementsByClassName('count'), e => {
    const multiplier = Number(e.getAttribute('base'));
    e.textContent = +(multiplier * newServings).toFixed(2);
  })
}
