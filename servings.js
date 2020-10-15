const ingredients = document.getElementsByClassName("ingredients");

document.addEventListener('click', event => {
    if (event.target.id === "ingredients")
        add1(1);
    
});

const add1 = (direction) => {
    const currentServings = document.getElementById("count");
    const servingCount = Number(currentServings.textContent);

    currentServings.textContent = servingCount + direction;
}