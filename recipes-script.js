const servingSize = document.getElementById("serving-size")
const ingredient = document.getElementsByClassName("serving-count")

document.addEventListener("click", event => {
    if (event.target.id === "decrease") updateServings(-1) 
    if (event.target.id === "increase") updateServings(1)
})

const updateServings = newServing => {
    if (+(servingSize.innerText) + newServing !== 0) {
        const currServings = +(servingSize.innerText)
        const newServings = currServings + newServing
        servingSize.innerText = newServings
        Array.prototype.map.call(ingredient, e => {
            // e.innerText = +(+(e.getAttribute("base")) * newServings).toFixed(2)
            const fraction = e.innerText
            if (fraction.includes("/")) e.innerText = e.getAttribute("base")
            e.innerText = +((e.innerText / currServings) * newServings).toFixed(2)
        })
    }
}