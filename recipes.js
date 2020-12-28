const count = document.getElementsByClassName('count');

document.addEventListener('click', event => {
  if (event.target.id === 'sub')
    updateServings(-1);
  if (event.target.id === 'plus')
    updateServings(1);
});

const updateServings = (direction) => {
  const curr = document.getElementById('serving-count');
  const scount = Number(curr.textContent);
  const updated = scount + direction;

  if (updated < 1) return;
  curr.textContent = updated;

  Array.prototype.map.call(count, e => {
    e.textContent = +((e.textContent / scount) * updated).toFixed(2);
  })
}
