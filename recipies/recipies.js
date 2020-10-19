const servings = document.getElementById("num-servings")
const ingredients = Array.from(document.getElementsByClassName("ingredient"))
const baseIngredients = ingredients.map(i => parseFloat(i.innerText))

document.addEventListener('click', event => {
    console.log(event.target.id)
    if (event.target.id === 'sub' && parseInt(servings.innerText) > 1) {
        updateServings(-1)
    }
    else if (event.target.id === 'add') {
        updateServings(1)
    }
})

const updateServings = dir => {
    servings.innerText = parseInt(servings.innerText) + dir
    for (i = 0; i < ingredients.length; i++) {
        ingredients[i].innerText = improvedRound(baseIngredients[i] * parseInt(servings.innerText))
    }
}

// Source: https://stackoverflow.com/questions/11832914/round-to-at-most-2-decimal-places-only-if-necessary
const improvedRound = num => {
    return Math.round((num + Number.EPSILON) * 100) / 100
}
