const recipeHash = window.location.hash.substring(1)
const getParam = recipeHash !== undefined ? '?id=' + recipeHash : null
const URL = 'https://3blzgwgi13.execute-api.us-west-2.amazonaws.com/Live/recipe'

let recipeData

fetch(URL + getParam)
  .then(response => response.json())
  .then(data => setRecipe(data))



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

const setRecipe = (data) => {
  recipeData = data

  document.location.hash = data._id

  // simple text updates
  document.getElementById('title').innerText = data.title
  document.getElementById('photo').src = data.picture
  document.getElementById('serving-count').innerText = data.servings
  document.getElementsByClassName('text')[0].innerText = data.desc

  // creating ingredient and instruction elements
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
