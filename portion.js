const count = document.getElementById('count')
const ingred = document.getElementsByClassName('ingred')

document.addEventListener('click', event => {
    if (event.target.id === 'minus' && count.innerText != 1) updateCountandPortion(-1)
    if (event.target.id === 'plus') updateCountandPortion(1)
})

const updateCountandPortion = dir => {
    count.innerText = +(count.innerText) + dir
    let currServings = +(count.innerText)
    let newServings = +(count.innerText) + dir

    ingred.innerText = +(ingred.innerText) / currServings * newServings
}