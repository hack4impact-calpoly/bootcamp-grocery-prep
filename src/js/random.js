const URL="https://3blzgwgi13.execute-api.us-west-2.amazonaws.com/Live/recipe"
const recipeHash = window.location.hash.substring(1)
const getParam = recipeHash !== undefined ? '?id=' + recipeHash : null
let recipeData

const getRecipe = () => {
    fetch(URL + getParam)
        .then(response => response.json())
        .then(data => createRecipe(data))
}

document.addEventListener('click', event => {
    if (event.target.id === 'post-rating') updateRating()
})

const updateRating = () => {
    curr_rating = document.getElementById("select-rating")

    const data = {
        id: recipeData._id,
        rating: +(curr_rating.value)
    }
    
    fetch(URL, {
        method: 'POST',
        body: JSON.stringify(data)
    })
      .then(() => {
          if (Number.isNaN(data.rating)){
            document.getElementById("ratings-num").innerText = avgRating(recipeData.ratings)
          }
          else {
            recipeData.ratings.push(data.rating)
            document.getElementById("ratings-num").innerText = avgRating(recipeData.ratings)
          }
      })
}

const avgRating = (ratings) => {
    let rating_acc = 0
    for (var i=0; i<ratings.length; i++){
        rating_acc += +(ratings[i])
    }
    avg_rating = rating_acc/ratings.length
    return Math.round(avg_rating * 10) / 10
}
/*if (Number.isNaN(+(curr_rating.value))) return
    else{
        data.ratings.push(+(curr_rating.value))
        rating_acc += +(curr_rating.value)
        console.log(rating_acc)
        avg_rating = rating_acc/data.ratings.length
        console.log(Math.round(avg_rating * 10) / 10)
        console.log(data.ratings)
    }*/

/*let rating_acc = 0
for (var i=0; i<data.ratings.length; i++){
    rating_acc += +(data.ratings[i])
}



*/

const createRecipe = (data) => {
    recipeData = data
    document.location.hash = data._id
    /*for (let key in data.ingredients) {
        ingredients.push(data.ingredients[key] + " " + key)
    }
    console.log(ingredients)*/
    let ingredients = []
    for (let key in data.ingredients) {
        ingredients.push(key)
    }
    const createHTML =`
    <div class="intro">
        <div class="recipe-title"
            <p id="welcome">${data.title}</p>
            <p id="ratings"><span id="ratings-num"></span> ⭐️</p>
        </div>
        <div class="description">
            <p class="text-description">${data.desc}</p>
            <img class="pic-description" src=${data.picture}>
            <p class="serving">
                Servings
                <button id="sub">-</button>
                <span id="count">${data.servings}</span>
                <button id="add">+</button>
            </p>
            <div class="rating">
                <label for="select-rating" id="rating-label">Rate Me!</label>
                <select id="select-rating">
                    <option selected hidden disabled>Select Rating</option>
                    <option value="1">⭐️</option>
                    <option value="2">⭐️⭐️</option>
                    <option value="3">⭐️⭐️⭐️</option>
                    <option value="4">⭐️⭐️⭐️⭐️</option>
                    <option value="5">⭐️⭐️⭐️⭐️⭐️</option>
                </select>
                <button id="post-rating">Post Rating</button>
                </div>
        </div>
    </div>
    <section class="recipe">
        <h1 class="highlight">Ingredients</h1>
        <div class="subsection">
            <ul>
                ${ingredients.map(key => `<li><span class="ingredient">${data.ingredients[key]}</span> ${key}</li>`).join('')}
            </ul>
        </div>
        <h1 class="highlight">Instructions</h1>
        <div class="subsection">
            <ol>
                ${data.instructions.map(step => `<li>${step}</li>`).join('')}
            </ol>
        </div>
    </section>`
    random.innerHTML = createHTML
    document.getElementById("ratings-num").innerText = avgRating(data.ratings)
    console.log(document.getElementById("count").innerText)
}
getRecipe()
