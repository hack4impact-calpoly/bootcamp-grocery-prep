const URL = 'https://3blzgwgi13.execute-api.us-west-2.amazonaws.com/Live/recipe'
var recipeData={}

const getRecipe = async() => {
    try{
        const response = await fetch(URL)
        const jsonResponse = await response.json()
        console.log(jsonResponse)
        recipeData = jsonResponse
        setRecipe(recipeData)
    } catch (err) {
        console.error(err)
    }
}
getRecipe()

const setRecipe = (recipeData) => {
    const title = document.getElementById('randomRecipe')
    const updatedTitle = recipeData.title
    title.textContent = updatedTitle

    const servingSize = document.getElementById('servingCount')
    const updatedServingSize = recipeData.servings 
    servingSize.textContent = updatedServingSize

    const img = document.getElementById('imgSrc')
    const updatedImg = recipeData.picture
    img.src = updatedImg

    const ingredients = document.getElementById('Ingredients')
    const updatedIngredients = recipeData.ingredients
    for (const [currItem, amount] of Object.entries(updatedIngredients)) {
        const item = document.createElement('li')
        const count = document.createElement('span')
        
        count.className = 'count'
        count.innerText = amount
        item.appendChild(count)
        item.innerHTML += " " + currItem
        ingredients.appendChild(item)
    }

    const instructions = document.getElementById('Instructions')
    const updatedInstruct = recipeData.instructions
    updatedInstruct.forEach(instruct => {
        const newInstruct = document.createElement('li')
        newInstruct.innerHTML = instruct
        instructions.appendChild(newInstruct)
    })
}

document.addEventListener('click', event => {
    if (event.target.id === 'post-rating')
    postRating()
})

const postRating = () => {
    const ratingSelect = document.getElementById('select-rating')
    const rating = +(ratingSelect.options[ratingSelect.selectedIndex].value)

    const data = {
        id: recipeData.id,
        rating: rating
    }

    fetch(URL, {
        method: 'POST',
        body: JSON.stringify(data)
    })
    .then(() => {
        recipeData.ratings.push(rating)
        document.getElementById('rating').textContent = avgRatings(recipeData.ratings)
    })
    .catch((err) => {
        console.error(err)
    })
}

const avgRatings = (ratings) => {
    let sum = 0
    for (const i in ratings)
        sum += +(ratings[i])
    return (sum / ratings.length).toFixed(1)
}