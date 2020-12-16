const recipeID = window.location.hash.substring(1) !== undefined ? "?id=" + window.location.hash.substring(1) : null
const URL = 'https://3blzgwgi13.execute-api.us-west-2.amazonaws.com/Live/recipe'
console.log(window.location.href)
let recipeData

fetch(URL + recipeID)
    .then(response => response.json())
    .then(data => formatData(data))

document.addEventListener('click', event =>{
    if (event.target.id === 'submitRatings')
        postRatings()
})

const formatData = (data) =>{
    setRatings(data)
    updateURL(data)

    recipeData = data
    document.getElementById('title').innerText = data.title
    document.getElementById('picture').src = data.picture
    document.getElementById('count').innerText = data.servings
    document.getElementById('count').dataset.base = data.servings
    document.getElementById('desc').innerText = data.desc
    
    setIngredients(data)
    setInstructions(data)
}

const setIngredients = (data) => {
    for (const [key, value] of Object.entries(data.ingredients)){
        const ingredient = document.createElement("li")
        const amount = document.createElement("span")

        amount.className = 'amount'
        amount.dataset.base = value
        amount.innerText = value

        ingredient.appendChild(amount)
        ingredient.innerHTML += " " + key
        document.getElementById('ingredients').appendChild(ingredient)

    }
}

const setInstructions = (data) => {
    for (const x of data.instructions){
        const instruction = document.createElement("li")
        instruction.innerHTML = x
        document.getElementById('instructions').appendChild(instruction)

    } 
}

const setRatings = (data) => {
    const ratings = data.ratings
    var totalRatings = 0
    var i = 0
    for(; i < data.ratings.length; i++){
        totalRatings += parseInt(ratings[i])
    }
    const averageRatings = totalRatings / i
    document.getElementById("rating").innerText = String(averageRatings.toFixed(2)) + "★"
}

const postRatings = () =>{
    var selectedRating = document.getElementById("select-rating")
    var rating = parseInt(selectedRating.options[selectedRating.selectedIndex].value)
    
    if (rating === 0){
        return
    }

    var postData = {
        "id": recipeData._id,
        "rating": rating
    }

    fetch(URL, {
        method: 'POST',
        body: JSON.stringify(postData)
    })
    .then(() => {
        recipeData.ratings.push(rating)
        setRatings(recipeData)
    }
    )
}

const updateURL = (data) => {
    window.location = "#" + String(data._id)
}