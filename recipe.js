const elements = document.getElementsByClassName('count')

document.addEventListener('click', event => {
    if (event.target.id === 'dec')
        updateServings(-1)
    if (event.target.id === 'inc')
        updateServings(1)
})

const updateServings = (direction) => {
    const current = document.getElementById('serving-count')
    const serving = Number(current.textContent)
    const newServings = serving + direction

    if (newServings < 1) return
    current.textContent = newServings

    Array.prototype.map.call(elements, e => {
        e.textContent = +((e.textContent / serving) * newServings).toFixed(2)
    })
}
