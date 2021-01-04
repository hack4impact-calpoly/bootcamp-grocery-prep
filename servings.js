const serving_count = document.getElementById("serving_count")
const ingred_count = document.getElementsByClassName("count")

//Updates the number of servings
const updateCount = dir => { 

    if(+(serving_count.innerText) + dir >= 1){ //fix this if statement!!
        serving_count.innerText = +(serving_count.innerText) + dir
    }
    //serving_count.innerText = +(serving_count.innerText) + dir
}

//Updates the number of ingredients needed based on the number of servings
const updateIngredients = dir => {
    if(+(serving_count.innerText) + dir >= 1){
        curr_serving = +(serving_count.innerText)
        new_serving = curr_serving + dir
        for(var i = 0; i < ingred_count.length; i++){
            ingred_count[i].innerText = (+(ingred_count[i].innerText) / curr_serving) * new_serving
            //ingred_count[i].innerText = Math.round((+(ingred_count[i].innerText) + Number.EPSILON) * 100) / 100
            ingred_count[i].innerText = Math.round(+(ingred_count[i].innerText) * 100) / 100
        }
    }
}

document.addEventListener("click", event => {
    //If the decrease button is clicked, ingredients will decrease by a factor of 1, and serving count will decrease by 1
    if(event.target.id == "dec") {
        updateIngredients(-1)
        updateCount(-1)
    }
    //If the decrease button is clicked, ingredients will increase by a factor of 1, and serving count will increase by 1
    if(event.target.id == "inc"){
        updateIngredients(+1)
        updateCount(+1)
    } 
})