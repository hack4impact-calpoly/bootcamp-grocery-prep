firstIter = true

document.addEventListener('click', event => {
    const counter = document.getElementById("counter");
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
    updateIngredient(Number(counter.innerText));
    if (Number(counter.innerText) >= 10 && firstIter === true){
            const newParagraph = document.createElement("p");
            const node = document.createTextNode("WOW! That's a lot of servings! I'm glad you like it :)");
            newParagraph.appendChild(node);
            const element = document.getElementById("last");
            element.appendChild(newParagraph);
            newParagraph.id = "newParagraph";
            firstIter = false;
    }
    else if (Number(counter.innerText) < 10 && firstIter === false){
        const removed = document.getElementById("newParagraph");
        removed.remove();
        firstIter = true
    }
}

const updateIngredient = servingSize => {
    const ingredientNums = document.getElementsByClassName("ingredCount");

    for (const food in ingredientNums) {
        if (ingredientNums.hasOwnProperty(food)) {
            const element = ingredientNums[food];
            const starter  = Number(element.getAttribute("starter"));
            element.textContent = starter * servingSize;         
        }
    }
}