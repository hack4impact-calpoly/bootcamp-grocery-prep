const URL = 'https://3blzgwgi13.execute-api.us-west-2.amazonaws.com/Live/recipe'
let recipeID;

const getRecipe = async () => {
    try {
        const response = await fetch(URL);
        const jsonResponse = await response.json();
        return jsonResponse;
        
    } catch (err) {
        console.error(err);
    }
}

const populateWebPage = async () => {

    try {
        const randomRecipe = await getRecipe(); 

        recipeID = randomRecipe._id;
        document.getElementById('head-title').innerText = randomRecipe.title + ' Recipe';
        document.getElementById('title').innerText = randomRecipe.title;
        document.getElementById('serving-count').innerText = randomRecipe.servings;
        document.getElementById('food-photo').src = randomRecipe.picture;
        document.getElementById('description').innerText = randomRecipe.desc;

        let count = 0;
        for(i = 0; i < randomRecipe.ratings.length; i++) {
            count += parseFloat(randomRecipe.ratings[i]);
        }
        document.getElementById('avg-rating').innerText = (count / randomRecipe.ratings.length).toFixed(1);

        for(const key in randomRecipe.ingredients) {
            const ul = document.getElementById("ingredients");

            const span = document.createElement("span");
            span.setAttribute("class", "count");
            span.appendChild(document.createTextNode(randomRecipe.ingredients[key]));

            const li = document.createElement("li");
            li.appendChild(span);
            li.appendChild(document.createTextNode(" " + key));

            ul.appendChild(li);
        }

        randomRecipe.instructions.map( (item)  => {
            const ol = document.getElementById("instructions");

            const li = document.createElement("li");
            li.appendChild(document.createTextNode(item));

            ol.appendChild(li);
        });
    } catch (err) {
        console.error(err);
    }
}

const postRating = async (ratingValue) => {
    try {
        const object = {
            id: recipeID,
            rating: ratingValue
        }

        const options = {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(object)
        }

        const response = await fetch(URL, options);

    } catch(err) {
        console.error(err);
    }

}

const listenToSubmitRating = async () => {
    try {
        document.addEventListener('click', event => {
            if(event.target.id === 'submit-rating') {
                const rating = document.getElementById("select-rating").value;
                if(rating != 0) {
                    postRating(rating);
                }
            }
        })
    } catch(err) {
        console.error(err);
    }
}

populateWebPage();
listenToSubmitRating();


