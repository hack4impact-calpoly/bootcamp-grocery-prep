document.addEventListener('click', event => {
    if (event.target.id === 'sub') {
        updateServings(-1);
    }
    else if (event.target.id === 'add') {
        updateServings(1);
    }
})

const updateServings = dir => {
    const servings = document.getElementById("num-servings");
    const oldServings = parseInt(servings.innerText);
    let numServings = oldServings;
    const ingredients = Array.from(document.getElementsByClassName("ingredient"));
    let numIngredients = ingredients.map(i => parseFloat(i.innerText))

    numServings += dir
    if (numServings < 1) {
        return
    }


    servings.innerText = numServings
    for (i = 0; i < ingredients.length; i++) {
        ingredients[i].innerText = improvedRound((numIngredients[i] / oldServings) * numServings);
    }
}

// Source: https://stackoverflow.com/questions/11832914/round-to-at-most-2-decimal-places-only-if-necessary
const improvedRound = num => {
    return Math.round((num + Number.EPSILON) * 100) / 100
}
