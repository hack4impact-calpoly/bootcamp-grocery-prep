const countElements = document.getElementsByClassName('count')

document.addEventListener('click', event => {
    //if(event.target.id === 'sub')updateCount(-1)
    if(event.target.id === 'sub')updateIngredients(-1)
    //if(event.target.id === 'add')updateCount(1)
    if(event.target.id === 'add')updateIngredients(1)
})

const updateIngredients = (sign) => {
    const currentServings = document.getElementById('servingCount')
    const servingCount = Number(currentServings.textContent)
    const newServings = servingCount + sign

    if (newServings < 1) return
    currentServings.textContent = newServings

    Array.prototype.map.call(countElements, e => {
        e.textContent = +((e.textContent / servingCount) * newServings).toFixed(2)
    })
}