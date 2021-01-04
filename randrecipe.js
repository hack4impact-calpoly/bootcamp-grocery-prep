const URL = "https://3blzgwgi13.execute-api.us-west-2.amazonaws.com/Live/recipe"
const rand_h1 = document.getElementById("randTitle")
const rand_desc = document.getElementById("randDesc")
const rand_Img = document.getElementById("randImg")
const rand_serving_count = document.getElementById("serving_count")
const rand_Ingredients = document.getElementById("randIngredients")
const rand_Instructions = document.getElementById("randInstructions")
const rand_rating = document.getElementById("rating")

const recipeHash = window.location.hash.substring(1)
const getParam = recipeHash !== undefined ? '?id=' + recipeHash : null

console.log(recipeHash)
console.log(getParam)


const getRecipe = async() =>{
    try{
        const response = await fetch(URL + getParam)
        const jsonResponse = await response.json()
        postRecipe(jsonResponse)
        return jsonResponse
        
    }catch(err){
        console.log(err)
    }
    
}


const postRecipe = jsonResponse =>{
    
    jsonResponse1 = jsonResponse

    document.location.hash = jsonResponse._id

    const keys = Object.keys(jsonResponse.ingredients)
    sum_ratings = 0
    
    rand_h1.innerText = jsonResponse.title
    rand_desc.innerText = jsonResponse.desc
    rand_Img.src = jsonResponse.picture
    rand_serving_count.innerText = jsonResponse.servings
    
    //Writes the ingredients json into an unordered list in the HTML
    for(var i = 0; i < keys.length; i++){
        rand_Ingredients.innerHTML += ("<li><span class = 'count'>" + jsonResponse.ingredients[keys[i]] + "</span> " + keys[i] + "</li>")
    }
    
    //Writes the array of instructions into an ordered list in the HTML
    for(var i = 0; i < jsonResponse.instructions.length; i++){
        rand_Instructions.innerHTML += ("<li>" + jsonResponse.instructions[i] + "</li>")
    }
    
    //Caluclates the average rating for the recipe
    for(var i = 0; i < jsonResponse.ratings.length; i++){
        sum_ratings += +(jsonResponse.ratings[i])
    }
    rand_rating.innerText = Math.round((sum_ratings/jsonResponse.ratings.length) * 10) / 10
}


const postRating = jsonResponse =>{
    
    const rating = +(document.getElementById("ratings").value)

    const data = { 
        id: jsonResponse._id,
        rating: rating
    }
    
    fetch(URL, {
        method: 'POST',
        body: JSON.stringify(data),
    })
    .then(() => {
        //console.log(jsonResponse.ratings)
        jsonResponse.ratings.push(rating)
        //console.log(jsonResponse.ratings)
    })
    .catch((err) => {
        console.log(err);
    });
    
}

let jsonResponse1 
getRecipe()


document.addEventListener("click", event => {
    if(event.target.id == "postButton"){
        postRating(jsonResponse1)
    }
})