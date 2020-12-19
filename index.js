const count = document.getElementById('count')

document.addEventListener('click', event => {
    if (+(count.innerText) > 1) {
        if (event.target.id === 'sub') {
            newCount = +(count.innerText) - 1
            updateIngredient(count.innerText, newCount)
        }}
        if (event.target.id === 'add') {
            newCount = +(count.innerText) + 1
            updateIngredient(count.innerText, newCount)
        }

        count.innerText = newCount
    
})

const updateIngredient = () => {
    var ingredients = document.getElementsByClassName('ingredient')
    for (i = 0, len = ingredients.length; i < len; i++) {
        ingredients[i].innerText = (+(ingredients[i].innerText) / +(count.innerText)) * newCount
    }
}