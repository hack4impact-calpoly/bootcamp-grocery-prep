const countElements = document.getElementsByClassName('amount')

document.addEventListener('click', event => {
  if (event.target.id === 'sub')
    updateServings(-1)
  if (event.target.id === 'add')
    updateServings(1)
})

const updateServings = (dir) => {
  const currentServings = document.getElementById('count')
  const servingCount = Number(currentServings.textContent)
  const newServings = servingCount + dir

  if (newServings < 1) return

  currentServings.textContent = newServings
  Array.prototype.map.call(countElements, e => 
    {
    e.textContent = +((e.textContent / servingCount) * newServings).toFixed(2)
    }
  )
} 
