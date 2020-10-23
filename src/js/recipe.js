const count = document.getElementById("count")
const ingredients = document.getElementsByClassName('ingredient')
console.log(ingredients)

document.addEventListener('click', event => {
    if (event.target.id === 'sub') updateCount(-1)
    if (event.target.id === 'add') updateCount(1)
})

function updateCount(dir){
    if (dir == -1 && count.innerText == 1) return
    for (i=0; i < ingredients.length; i++){
        ingredients[i].innerText = +(ingredients[i].innerText) + dir*(ingredients[i].innerText / count.innerText)
    }
    count.innerText = +(counts.innerText) + dir
}
