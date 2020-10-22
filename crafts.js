const countElements = document.getElementsByClassName('count')

document.addEventListener('click', event => {
  if (event.target.id === 'dec')
    updateAmount(-1)
  if (event.target.id === 'inc')
    updateAmount(1)
})

const updateAmount = (direction) => {
  const currAmount = document.getElementById('amount')
  const amount = Number(currAmount.textContent)
  const newAmount = amount + direction

  if (newAmount < 1) return
  currAmount.textContent = newAmount

  Array.prototype.map.call(countElements, e => {
    e.textContent = +((e.textContent / amount) * newAmount).toFixed(2)
  })
}