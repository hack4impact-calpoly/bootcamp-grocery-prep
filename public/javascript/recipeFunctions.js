const countElements = document.getElementsByClassName('amount')

document.addEventListener('click', event => {
  if (event.target.id === 'more')
    adjustServing(-1)
  if (event.target.id === 'less')
  adjustServing(1)
})

const adjustServing = (direction) => {
  const currentSize = document.getElementById('servings')
  const servingAmount = Number(currentSize.textContent)
  const newServings = servingAmount + direction

  if (newServings < 1) return
  currentSize.textContent = newServings

  Array.prototype.map.call(countElements, e => {
    e.textContent = +((e.textContent / servingAmount) * newServings).toFixed(2)
  })
}

