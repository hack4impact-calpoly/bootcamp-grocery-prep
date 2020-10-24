/*{_id: "5f7925a93a0f9431b7dc9f53", 
title: "Tuna Casserole", desc: "If you can get over your hatred of tuna, you will enjoy this one", 
desc: "If you can get over your hatred of tuna, you will enjoy this one"
picture: "https://h4i-bootcamp-recipe-pics.s3-us-west-2.amazonaws.com/tuna_casserole.jpg"
ingredients: {can of tuna: 1, box of mac and cheese: 1, can of cream of mushroom soup: 1, cup of milk: 0.5, tbsp of butter: 1, …}
instructions: (4) ["Cook mac and cheese as normal", "Mix in cream of mushroom soup and tuna", "Put in a casserole dish and top with cheese slices", "Bake in oven at 350 for 25 minutes"]
ratings: (403) [1, 2, 3, 2, "3", "2", 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, …]
servings: 6
title: "Tuna Casserole"
_id: "5f7925a93a0f9431b7dc9f53"
__proto__: Object*/

const URL = 'https://3blzgwgi13.execute-api.us-west-2.amazonaws.com/Live/recipe'
let data

const getRandomData = async (URL) => {
    fetch(URL)
        .then(response => response.json())
        .then(response => createLayout(response))
}

document.addEventListener("click", event => {
    if (event.target.id == 'post'){
        const ratingSelect = document.getElementById("select-rating")
        const rating = Number(ratingSelect.options[ratingSelect.selectedIndex].value)
        addRating(rating)
    }
})

const addRating = (rating) => {
    const dataToPush = {
        id: data._id,
        rating: rating
    }

    fetch(URL, {
        method:"POST",
        body: JSON.stringify(dataToPush)
    })
        .then(() => {
            data.ratings.push(rating)
            averageScore = averageRating(data.ratings);
            document.getElementById("averageRating").textContent = String(averageScore.toFixed(2));
        })
        .catch((err) => {
            console.error(err);
        })

}

const averageRating = (ratings) =>{
    average = 0;
    for (i = 0; i < ratings.length; i ++){
        average += Number(ratings[i])
    }
    average = average / ratings.length
    return Number(average);
}

const createLayout = (response) => {
    data = response;
    averageScore = averageRating(data.ratings);

    document.getElementById("title").textContent = data.title;
    document.getElementById("recipeTitle").textContent = data.title;
    document.getElementById("desc").textContent = data.desc;
    document.getElementById("picture").src = data.picture;
    document.getElementById("averageRating").textContent = String(averageScore.toFixed(2));

    const ingredients = document.getElementById("ingredientList")
    const ingredientSize = Object.entries(data.ingredients).length;
    counter = 0;
    for (const [key, value] of Object.entries(data.ingredients)){
        counter += 1;

        const name = document.createElement("li")
        const number = document.createElement("span")

        number.className = "ingredCount";
        number.setAttribute("starter", value) //gives the custom attribute a value to work with
        number.innerText = value;
        
        name.appendChild(number);
        name.innerHTML += " " + key;
        
        ingredients.appendChild(name);

        if (counter === ingredientSize){
            name.id = "last";
        }
    }

    const steps = document.getElementById("stepsList")
    for (i = 0; i < data.instructions.length; i++){
        const newStep = document.createElement("li")
        newStep.innerText = data.instructions[i]
        steps.appendChild(newStep)
    }
}

getRandomData(URL)