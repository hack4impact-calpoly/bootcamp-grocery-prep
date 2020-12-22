const hash = window.location.hash.substring(1) // get recipe hash without the #
const URL = 'https://3blzgwgi13.execute-api.us-west-2.amazonaws.com/Live/recipe'

let recipeData

const getRecipe = async () => { 
    try {
        if (hash != undefined) {
            const response = await fetch(URL + '?id='+ hash)
            const jsonResponse = await response.json()
            recipeData = jsonResponse 
            setRecipe(recipeData)
        } else {
            const response = await fetch(URL)
            const jsonResponse = await response.json()
            recipeData = jsonResponse 
            setRecipe(recipeData)
        }
        // when I move the duplicated lines out here it stops working??????SD???S?DF?LJSDFL? EXCUSE ME?!

    } catch (err) {
        console.error(err)
    }
}

getRecipe()

const setRecipe = (data) => {
    document.location.hash = data._id

    document.getElementById('title').innerText = data.title
    document.getElementById('food-photo').src = data.picture
    document.getElementById('desc').innerText = data.desc

    const ingredients = document.getElementById('ingredients')
    for (const [key, value] of Object.entries(data.ingredients)) {
        // key: item, value: count
        const item = document.createElement('li')
        const count = document.createElement('span')
        
        //add class tag to span so serving size can update
        count.className = 'ingredient'
        count.innerText = value

        item.appendChild(count) //count to list
        item.innerHTML += " " + key 
        ingredients.appendChild(item)
    }

    const instructions = document.getElementById('instructions')
    for (let value of data.instructions) {
        const item = document.createElement('li')
        item.innerText = value
        instructions.appendChild(item)
    }

    document.getElementById('rating').innerText = avgRatings(data.ratings)

}

//posting rating
document.addEventListener('click', event => {
    if (event.target.id === 'postRating')
        postRating()
})

const postRating = () => {
    const ratingSelect = document.getElementById('rateSelect')
    const rating = +(ratingSelect.options[ratingSelect.selectedIndex].value)

    const data = {
        id: recipeData._id,
        rating: rating
    }

    fetch(URL, {
        method: 'POST',
        body: JSON.stringify(data)
    })
    .then(() => {
        recipeData.ratings.push(rating)
        document.getElementById('rating').innerText = avgRatings(recipeData.ratings)
    })
    .catch((err) => {
        console.error(err)
    })
}

const avgRatings = (ratings) => {
    let sum = 0
    for (const i in ratings)
        sum+= +(ratings[i])
    return (sum / ratings.length).toFixed(2)
}