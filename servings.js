const ingredients = document.getElementsByClassName("counter");

document.addEventListener('click', event => {
    if (event.target.id === "up")
        changeServings(1);
    if (event.target.id === "down")
        changeServings(-1);
    
});
// copied from the grocery website for a few hours 
// made sure I understand everything thats happening

const changeServings = (direction) => {
    const currentServings = document.getElementById("serving-count");
    const servingCount = Number(currentServings.textContent);
    const newServings = servingCount + direction;

    if(newServings < 1) return;

    currentServings.textContent = newServings;

    Array.prototype.map.call(ingredients, e => {

        const itemServing = Number(e.getAttribute('ammount'));
        e.textContent = +(itemServing * newServings).toFixed(2);

    })
}