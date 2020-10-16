const countElements = document.getElementsByClassName('count');

document.addEventListener('click', event => {
  if (event.target.id === 'dec')
    updateAmount(-1);
  if (event.target.id === 'inc')
    updateAmount(1);
});

const updateAmount = (direction) => {
  const currentAmount = document.getElementById('amount-count');
  const amountCount = Number(currentAmount.textContent);
  const newAmount = amountCount + direction;

  if (newAmount < 1) return;
  currentAmount.textContent = newAmount;

  Array.prototype.map.call(countElements, e => {
    const itemAmount = Number(e.getAttribute('base'));
    e.textContent = +(itemAmount * newAmount).toFixed(2);
  })
}