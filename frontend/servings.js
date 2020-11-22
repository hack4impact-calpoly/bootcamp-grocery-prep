var negative = document.getElementById("negative")
var positive = document.getElementById("positive")

negative.addEventListener("click", () => {changeServingSize(-1)})
positive.addEventListener("click", () => {changeServingSize(1)})

function changeServingSize(dir) {
    const count = document.getElementById("servings-text")
    const baseM = count.innerText
    if (dir == -1 && +(count.innerText) > 1)
       count.innerText = +(count.innerText) + dir
    else if (dir == 1)
       count.innerText = +(count.innerText) + dir
    changeServing(baseM, count.innerText)
 }

 function changeServing(baseM, multiplier) {
     var servings = document.getElementsByClassName("serving-num")
     for (var i=0; i < servings.length; i++) {
         servings[i].innerText = (+(servings[i].innerText) / baseM) * multiplier
     }
 }
