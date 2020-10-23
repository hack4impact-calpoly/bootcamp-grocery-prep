const URL = "https://3blzgwgi13.execute-api.us-west-2.amazonaws.com/Live/recipe"
const submitButton = document.getElementById("submit-rating")
let fullURL
let id

const getFullURL = () => {
    hash = window.location.hash.substring(1)
    if (hash == null)
        fullURL = URL
    else {
        fullURL = URL + "?id=" + hash
        console.log(fullURL)
    }
}

const getRandomRecipe = async () => {
    try {
        const response = await fetch(fullURL)
        const jsonResponse = await response.json()
        id = jsonResponse._id
        manipulateDOM(jsonResponse)
    }
    catch (err) {
        console.log(err)
    }
}

const manipulateDOM = (jsonData) => {
    document.getElementById("title").innerText = jsonData.title
    window.location.hash = id
    document.getElementById("description").innerText = jsonData.desc
    document.getElementById("count").innerText = jsonData.servings
    document.getElementById("picture").src = jsonData.picture
    document.getElementById("rating").innerText = getAverageRating(jsonData).toString() + "☆"

    const ingredientsList = document.getElementById("ingredientsList")
    for (const [item, quantity] of Object.entries(jsonData.ingredients)) {

        const newIngredient = document.createElement("li")
        newIngredient.className = "ingredient"
        newIngredient.innerText = quantity + " " + item
        ingredientsList.appendChild(newIngredient)
      }

    const instructionsList = document.getElementById("instructionsList")
    for (i = 0; i < jsonData.instructions.length; i++) {
        const newInstruction = document.createElement("li")
        newInstruction.innerText = jsonData.instructions[i]
        instructionsList.appendChild(newInstruction)
    }    
}

const getAverageRating = (jsonData) => {
    let ratingSum = 0;
    ratingList = jsonData.ratings
    for (i = 0; i < ratingList.length; i++) {
        ratingSum += parseInt(ratingList[i])
    }
    return (ratingSum / ratingList.length).toFixed(2)

}

submitButton.addEventListener("click", async () => {
    const ratingSelection = document.getElementById("review")
    selectedValue = parseInt(ratingSelection.value)
    const dataForPosting = {
        "id": id,
        "rating": selectedValue
    }
    try {
        await fetch(URL, {
            "method": "POST",
            "body": JSON.stringify(dataForPosting)
        })
        const response = await fetch(fullURL)
        const jsonResponse = await response.json()
        document.getElementById("rating").innerText = getAverageRating(jsonResponse).toString() + "☆"
    }
    catch (err) {
        console.log(err)
    }
    
})

getFullURL()
getRandomRecipe()

// Object
// desc: "Whenever you're feeling those sad cowboy vibes, grab a bowl of this chili. It won't help, it's just good"
// ingredients: {can of chili: 1, handfuls of shredded cheese: 1, crushed ritz crackers: 7, cups of white rice: 1}
// instructions: (3) ["Heat the chili until warm", "Add other ingredients to the pot", "Serve warm"]
// picture: "https://h4i-bootcamp-recipe-pics.s3-us-west-2.amazonaws.com/chili.jpg"
// ratings: (10) [4, 3, 3, 4, 5, 4, 2, 4, 4, 5]
// servings: 1
// title: "Chili"
// _id: "5f7929fc3a0f9431b7dc9f58"
// __proto__: Object