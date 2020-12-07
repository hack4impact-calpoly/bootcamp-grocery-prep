const addIngredientsEles = (ings) => {
    const outer = document.querySelector('ul');
    for (const ing in ings) {
        const li = document.createElement('li');
        li.innerHTML = `${ings[ing]} ${ing}`; 
        outer.appendChild(li);
    }
};

const addInstructionEles = (instrs) => {
    const outer = document.querySelector('ol');
    for (const inst of instrs) {
        const li = document.createElement('li');
        li.innerHTML = inst;
        outer.appendChild(li);
    }
};

const setNewRating = (rating) => {
    document.getElementById('avg-rating').innerHTML = `${Math.round(rating * 10) / 10} ☆`;
};

const getAvgRating = (ratings) => {
    if (ratings.length == 0) {
        return 0;
    }
    return ratings.reduce((a, b) => (+a) + (+b)) / ratings.length;
};

const setRecipeInPage = (recipe) => {
    const img = document.createElement('img');
    img.src = recipe.picture;
    img.height = "250";

    const pEle = document.createElement('p');
    pEle.innerHTML = recipe.desc;

    document.getElementById('recipe-title').innerHTML = recipe.title;
    document.getElementById('serving-size').innerHTML = recipe.servings;
    const avgRating = getAvgRating(recipe.ratings);
    setNewRating(avgRating);
    // Hack to add to array without globally being available
    document.querySelector('.recipe-desc-txt').prepend(pEle);
    addIngredientsEles(recipe.ingredients);
    addInstructionEles(recipe.instructions);
    document.querySelector('.desc-nontxt').appendChild(img);

    document.getElementById('post-rating').addEventListener('click', async () => {
        const ratingToSubmit = document.getElementById('rating-options').value;
        if (ratingToSubmit >= 1 && ratingToSubmit <= 5) {
            recipe.ratings.push(+ratingToSubmit);
        } else {
            alert('Please select a valid rating!');
            return;
        }
        const response = await fetch(`https://3blzgwgi13.execute-api.us-west-2.amazonaws.com/Live/recipe`, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json'
            },
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            body: JSON.stringify({
                id: recipe._id,
                rating: ratingToSubmit,
            }) // body data type must match "Content-Type" header
        });
        if (response.ok) {
            const newRating = getAvgRating(recipe.ratings);
            setNewRating(newRating);
        } else {
            alert('Could not add rating :(');
        }
    });
};

const getRandomRecipe = async () => {
    try {
        const response = await fetch('https://3blzgwgi13.execute-api.us-west-2.amazonaws.com/Live/recipe');
        if (!response.ok) {
            alert('error occurred in fetch... redirecting');
            window.location.href = '/';
            return;
        }
        const randomRecipe = await response.json();
        setUrlWithoutReloading(`${document.location.href}?id=${randomRecipe._id}`);
        setRecipeInPage(randomRecipe);
    } catch (error) {
        console.log(error);
    }
};

const getSpecificRecipe = async (recipeId) => {
    try {
        const response = await fetch(`https://3blzgwgi13.execute-api.us-west-2.amazonaws.com/Live/recipe?id=${recipeId}`);
        if (!response.ok) {
            alert('error occurred in fetch probably due to invalid given recipe id... redirecting');
            window.location.href = '/';
            return;
        }
        const recipe = await response.json();
        setRecipeInPage(recipe);
    } catch (error) {
        console.log(error);
    }
};

const setUrlWithoutReloading = (url) => {
    window.history.pushState(null, document.title, url);
};

window.onload = () => {
    const qd = {};
    if (location.search) location.search.substr(1).split("&").forEach(function(item) {
        var s = item.split("="),
            k = s[0],
            v = s[1] && decodeURIComponent(s[1]); //  null-coalescing / short-circuit
        //(k in qd) ? qd[k].push(v) : qd[k] = [v]
        (qd[k] = qd[k] || []).push(v) // null-coalescing / short-circuit
    });
    if (!!qd['id']) {
        getSpecificRecipe(qd['id'][0]);
    } else {
        getRandomRecipe();
    }
};