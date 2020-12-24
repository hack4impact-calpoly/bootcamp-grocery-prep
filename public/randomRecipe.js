const recipeHash = window.location.hash.substring(1)
const URL = 'https://3blzgwgi13.execute-api.us-west-2.amazonaws.com/Live/recipe'

let recipeURL
let recipeData

// get recipe URL
const getRecipeURL = () => {
  if(recipeHash == null) recipeURL = URL
  else recipeURL = URL + '?id=' + recipeHash
}

// get a recipe from the server
const accessServer = async () => {
  try {
    const response = await fetch(recipeURL)
    const jsonResponse = await response.json()
    displayRecipe(jsonResponse)
  }
  catch (err) {
    console.error(err)
  }
}

// post a rating to the server
document.addEventListener('click', event => {
  if (event.target.id === 'post-rating')
    postRating()
})

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

const displayRecipe = (data) => {
  recipeData = data

  document.location.hash = data._id

  // update title, pic, serving count, and description
  document.getElementById('title').innerText = data.title
  document.getElementById('food-photo').src = data.picture
  document.getElementById('serving-count').innerText = data.servings
  document.getElementsByClassName('desc')[0].innerText = data.desc

  // ingredient elements
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

  // instruction elements
  data.instructions.forEach(instruction => {
    const item = document.createElement('li')
    item.innerText = instruction
    document.getElementById('instructions').appendChild(item)
  })

  document.getElementById('rating').innerText = avgRatings(data.ratings)
}

const avgRatings = (ratings) => {
  let sum = 0
  for (const i in ratings)
    sum += +(ratings[i])
  return (sum / ratings.length).toFixed(1)
}

getRecipeURL()
accessServer()