const minusButton = document.getElementById("minus");
const plusButton = document.getElementById("plus");

minusButton.addEventListener("click", function() {
    let count = document.getElementById("count");
    let countValue = parseInt(count.innerText);
    let countFactor;
    if (countValue > 1)
    {
        countFactor = (countValue - 1)/countValue
        countValue--;
        count.innerText = countValue.toString()
        alterIngredients(countFactor);
    }
});

plusButton.addEventListener("click", function() {
    let count = document.getElementById("count");
    let countValue = parseInt(count.innerText);
    let countFactor = (countValue + 1)/countValue
    countValue++;
    count.innerText = countValue.toString()
    alterIngredients(countFactor);
});

function alterIngredients(countFactor) {
    let ingredientList = document.getElementsByClassName("ingredient");
    for (var i = 0; i < ingredientList.length; i++) {
        let ingredient = ingredientList.item(i);
        let ingredientTextArray = ingredient.innerText.split(" ");
        let newIngredientCount = parseFloat(ingredientTextArray[0]) * countFactor;
        ingredientTextArray[0] = (Math.round(newIngredientCount * 100) / 100).toString();
        ingredient.innerText = ingredientTextArray.join(" ");
     }
}