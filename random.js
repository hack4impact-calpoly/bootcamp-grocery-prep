const recipeHash = window.location.hash.substring(1)
const getParam = recipeHash !== undefined ? '?id=' + recipeHash : null
const URL = 'https://3blzgwgi13.execute-api.us-west-2.amazonaws.com/Live/recipe'

let recipeData

// gets the recipe info
const getRecipe = () => { 
  fetch(URL + getParam)
    .then(response => response.json())
    .then(data => RecipeInfo(data))

  document.addEventListener('click', event => {
    if (event.target.id === 'post-rating')
      postRating()
  })}

// given the data from the random page, we will create the proper info to that will be set into out html
const RecipeInfo = (data) => {
  recipeData = data

  document.location.hash = data._id

  // get the id from html --> update it with the infromation from the random recipe
  document.getElementById('title').innerText = data.title
  document.getElementById('food-photo').src = data.picture
  document.getElementById('serving-count').innerText = data.servings

  // create the list of ingredients
  const ingredients = document.getElementById('ingredients')
  for (const [key, value] of Object.entries(data.ingredients)) {
    const item = document.createElement('li')
    const count = document.createElement('span')

    count.className = 'count'
    count.innerText = value

    item.appendChild(count)
    item.innerHTML += " " + key
    ingredients.appendChild(item)
  }


  //create the steps of the recipe
  data.instructions.forEach(steps => {
    const item = document.createElement('li')
    item.innerText = steps
    document.getElementById('steps').appendChild(item)
  })

  // gets the rating id and inputs the rating from the random page
  document.getElementById('rating').innerText = updateRatings(data.ratings)
}

const postRating = () => {
  const ratingSelect = document.getElementById('select-rating')
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

// we need to update the rating number when we 
const updateRatings = (ratings) => {
  let sum = 0
  for (const i in ratings)
    sum += +(ratings[i])
  return (sum / ratings.length).toFixed(1)
}

getRecipe()
