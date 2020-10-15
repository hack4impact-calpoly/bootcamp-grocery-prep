const countElements = document.getElementsByClassName('change');

document.addEventListener('click', event => {
  if (event.target.id === 'decrease')
    udpate(-1);
  if (event.target.id === 'increase')
    update(1);
});

const update = (direction) => {
  const current = document.getElementById('servecount');
  const count = Number(current.textContent);
  const news = count + direction;

  if (news < 1) return;
  current.textContent = news;

  Array.prototype.map.call(countElements, e => {
    const itemServing = Number(e.getAttribute('base'));
    e.textContent = +(itemServing * news).toFixed(2);
  })
}
