
const randomRecipe = document.getElementById('random-recipe');
const URL = 'https://3blzgwgi13.execute-api.us-west-2.amazonaws.com/Live/recipe';


const getRecipe = async () => {
    try {
        const response = await fetch(URL);
        const jsonResponse = await response.json();
        console.log(URL);
        const title = document.getElementById('title');
        title.innerText = jsonResponse['title'];

        const description = document.getElementById('description');
        description.innerText = jsonResponse['desc'];

        const picture = document.getElementById('recipe_photo');
        picture.src = jsonResponse['picture'];

        const ingredients = document.getElementById('ingredients');
        for (let key in jsonResponse['ingredients']) {
            let li = document.createElement('li');
            let count = document.createElement("span");
            count.textContent = jsonResponse['ingredients'][key];
            count.className = "count";
            li.appendChild(count);
            li.appendChild(document.createTextNode(' ' + key));
            ingredients.appendChild(li);
            console.log(li)
        }

        const instructions = document.getElementById('instructions');
        for (let key in jsonResponse['instructions']) {
            let ol = document.createElement('li');
            ol.appendChild(document.createTextNode(jsonResponse['instructions'][key]));
            instructions.appendChild(ol);
        }

        const ratings = document.getElementById('ratings');
        sum = 0;
        let count = 0;
        for (let key in jsonResponse['ratings']){
                sum = sum + jsonResponse['ratings'][key];
                count = count + 1
        }
        average = (sum/count).toFixed(1);
        ratings.innerHTML = average + "&#9734;";

        const id = jsonResponse['_id'];
        window.location.hash = jsonResponse['_id'];

    } catch (err){
        console.log(err)
    }
};
getRecipe();


document.addEventListener('click', event => {
    if (event.target.id === 'post-rating') {
        console.log("minus");
        postRating();
    };
});


const postRating = async () => {
    try {
        const response = await fetch(URL);
        const jsonResponse = await response.json();

        await fetch(URL, {
            method: 'POST',
            body: JSON.stringify({
                'id': window.location.href.split('#')[1],
                'rating': document.getElementById('select-rating').value
                })
            })
            .then(response => response.json())
            .then(json => console.log(json));

    } catch (err){
             console.log(err)
         }
};