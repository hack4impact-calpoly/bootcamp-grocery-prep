// getElementsbyClassName returns HTML colection object(made up of nodes w index numbers) sort of like an array

const ingredients = document.getElementsByClassName("counter");


// sets up a function that will be called whenever there is a click
document.addEventListener('click', event => {

    // checks if the target of the click has the specified id's
    if (event.target.id === "up")
        changeServings(1);
    if (event.target.id === "down")
        changeServings(-1);
    
});
// copied from the grocery website for a few hours 
// made sure I understand everything thats happening


//defines a custom function
const changeServings = function(direction) {
    const currentServings = document.getElementById("serving-count");
    const servingCount = Number(currentServings.textContent);
    const newServings = servingCount + direction;

    if(newServings < 1) return;

    currentServings.textContent = newServings;

    Array.prototype.map.call(ingredients, e => {

        const itemServing = Number(e.getAttribute('ammount'));
        e.textContent = +(itemServing * newServings).toFixed(2);

    })

    const plurals = document.getElementsByClassName("plural");


    for(i = 0; i < plurals.length; i++){
        
        let baseNum = Number(ingredients.item(i).getAttribute('ammount'));
        let curNum = Number(ingredients.item(i).textContent);
        
        if(direction == 1 || baseNum != curNum){
            plurals.item(i).textContent = "s";
        }
        else{
            plurals.item(i).textContent = "";
        }
    }
   

    
}