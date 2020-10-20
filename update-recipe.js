for (var key in ingredients) {
    document.getElementById("i" + key).innerHTML = Math.round(ingredients[key] * 100) / 100;
}
document.getElementById("serving-size").innerHTML = size;

document.getElementById("decrease").onclick = function() {changeSize(-1)};
document.getElementById("increase").onclick = function() {changeSize(1)};

function changeSize(amount) {
    let size = parseInt(document.getElementById("serving-size").innerHTML)
    if(size + amount == 0){
        return
    }
    document.getElementById("serving-size").innerHTML = size + amount

    for (var key in ingredients) {
        new_serving = (ingredients[key] / size) * (size + amount)
        ingredients[key] = new_serving
        document.getElementById("i" + key).innerHTML = Math.round(ingredients[key] * 100) / 100;
    }
}