const recipeHash = window.location.hash.substring(1)
const getURLSlug = recipeHash !== undefined ? "?id=" + recipeHash : null
const URL = "https://3blzgwgi13.execute-api.us-west-2.amazonaws.com/Live/recipe"

let recipeData

const getRecipe = () => {
  fetch(URL + getURLSlug)
    .then(response => response.json())
    .then(data => parseRecipe(data))

  document.addEventListener("click", event => {
  if (event.target.id === "post-rating")
    postRating()
  })
}

getRecipe()

const parseRecipe = data => {
  recipeData = data

  document.location.hash = data._id

  document.getElementById("recipe-name").innerText = data.title
  document.getElementsByClassName("description")[0].innerText = data.desc
  document.getElementById("serving-size").innerText = data.servings
  document.getElementById("recipe-image").src = data.picture

  const ingredients = document.getElementById("ingredients")
  for (const [key, value] of Object.entries(data.ingredients)) {
    const ingredient = document.createElement("li")
    const ingredientItem = document.createElement("a")
    const servingCount = document.createElement("span")

    if (value === null) {
      ingredientItem.className = "ingredient-item"
      ingredientItem.innerText = key
      ingredient.appendChild(ingredientItem)
    }

    else if (value !== null) {
      servingCount.className = "serving-count"
      servingCount.innerText = value

      ingredient.appendChild(servingCount)
      ingredient.innerHTML += " " + key
    }
    
    ingredients.appendChild(ingredient)
  }

  data.instructions.forEach(instruction => {
    const step = document.createElement("li")
    step.innerText = instruction
    document.getElementById("instructions").appendChild(step)
  })

  document.getElementById("rating").innerText = avgRatings(data.ratings)
}

const postRating = () => {
  const ratingSelect = document.getElementById("select-rating")
  const rating = +(ratingSelect.options[ratingSelect.selectedIndex].value)

  const data = {
    id: recipeData._id,
    rating: rating
  }

  fetch(URL, {
    method: "POST",
    body: JSON.stringify(data)
  })
  .then(() => {
    recipeData.ratings.push(rating)
    document.getElementById("rating").innerText = avgRatings(recipeData.ratings)
  })
  .catch((err) => {
    console.error(err)
  })
}

const avgRatings = ratings => {
  let sum = 0
  for (const i in ratings)
    sum += +(ratings[i])
  return (sum / ratings.length).toFixed(1)
}