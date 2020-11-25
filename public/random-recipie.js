/* id is set in this script and used in ratings.js */
let curId;
let curRecipie;

const loadRecipieContent = (id = '') => {
    const request = id ? `https://3blzgwgi13.execute-api.us-west-2.amazonaws.com/Live/recipe?id=${id}`
        : 'https://3blzgwgi13.execute-api.us-west-2.amazonaws.com/Live/recipe';
    fetch(request)
    .then(response => response.json())
    .then(recipie => generateRecipie(recipie));
}

if (window.location.hash) {
    loadRecipieContent(window.location.hash.substring(1));
} 
else {
    loadRecipieContent();
}


const generateRecipie = recipie => {
    window.location.hash = recipie._id;
    curRecipie = recipie;
    document.getElementById("title").innerText = recipie.title;
    document.getElementById("picture").src = recipie.picture;
    document.getElementById("desc").innerText = recipie.desc;
    document.getElementById("num-servings").innerText = recipie.servings;
    document.getElementById("user-rating").value = '';

    let ingredientsList = ``;
    let ingredientCount;
    for (ingredient in recipie.ingredients) {
        ingredientCount = recipie.ingredients[ingredient];
        ingredientsList += `<li><span class="ingredient">${ingredientCount}</span> ${ingredient}</li>`;
    }
    document.getElementById("ingredients-list").innerHTML = ingredientsList;

    let instructionsList = ``;
    for (instruction of recipie.instructions) {
        instructionsList += `<li>${instruction}</li>`
    }
    document.getElementById("instructions-list").innerHTML = instructionsList;

    displayRating(recipie.ratings);
}

const displayRating = (ratings) => {
    const full_star = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z"/></svg>';
    const half_star = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 5.173l2.335 4.817 5.305.732-3.861 3.71.942 5.27-4.721-2.524v-12.005zm0-4.586l-3.668 7.568-8.332 1.151 6.064 5.828-1.48 8.279 7.416-3.967 7.416 3.966-1.48-8.279 6.064-5.827-8.332-1.15-3.668-7.569z"/></svg>';
    const empty_star = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 6.76l1.379 4.246h4.465l-3.612 2.625 1.379 4.246-3.611-2.625-3.612 2.625 1.379-4.246-3.612-2.625h4.465l1.38-4.246zm0-6.472l-2.833 8.718h-9.167l7.416 5.389-2.833 8.718 7.417-5.388 7.416 5.388-2.833-8.718 7.417-5.389h-9.167l-2.833-8.718z"/></svg>';
    let rating = Math.round(average(ratings) * 2);
    
    const numFull = Math.floor(rating / 2);
    const numHalf = (rating % 2 === 0) ? 0 : 1;
    const numEmpty = 5 - numFull - numHalf;

    let ratingHTML = full_star.repeat(numFull) + half_star.repeat(numHalf) + empty_star.repeat(numEmpty);
    document.getElementById("ratings").innerHTML = ratingHTML;
    document.getElementById("num-ratings").innerText = `(${ratings.length})`
}

const average = list => {
    list = list.filter(isValidRating);
    let sum = list.reduce((a, b) => a + parseInt(b));
    return rating = sum / list.length;
}

const isValidRating = r => {
    return !(isNaN(r) || r < 1 || r > 5)
}