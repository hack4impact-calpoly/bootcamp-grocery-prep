
document.addEventListener('click', event => {
    if (event.target.id === 'sub' && Number(counter.innerText) > 1){
        updateServingCount(-1);
    }
    if (event.target.id === 'add'){
        updateServingCount(1);
    }
})

const updateServingCount = dir => {
    const counter = document.getElementById("counter");
    counter.innerText = Number(counter.innerText) + dir;
    updateIngredient(dir);
}

const updateIngredient = dir => {
    const ingredientNums = document.getElementsByClassName("ingredCount");
    const servingSize = document.getElementById("counter")
    console.log(ingredientNums.innerText);

}