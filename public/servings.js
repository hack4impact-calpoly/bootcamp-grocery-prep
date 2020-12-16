document.addEventListener('click', event => {
    if (event.target.id === 'minus' && +(count.innerText) > 1) updateCount(-1)
    if (event.target.id === 'plus') updateCount(1)
})

const updateCount = dir => {
    var baseServings = document.getElementById("count").dataset.base
    count.innerText = +(count.innerText) + dir
    updateRecipe((+(count.innerText) - (+(baseServings)))/(+(baseServings)))
}

const updateRecipe = mult => {
    var amount = document.getElementsByClassName("amount")
    for (var i = 0; i < amount.length; i++){
        var amnt = +(amount[i].dataset.base) + (mult * (amount[i].dataset.base))
        console.log(amnt)
        amount[i].innerText = String(amnt.toFixed(2))
    }
}