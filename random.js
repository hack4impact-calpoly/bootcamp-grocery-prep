const recipeHash = window.location.hash.substring(1)
const getParam = recipeHash !== undefined ? '?id=' + recipeHash : null
const URL = 'https://3blzgwgi13.execute-api.us-west-2.amazonaws.com/Live/recipe'

let recipeData

//average ratings
const average = (ratings) => {
  let total = 0
  for (let i = 0; i < ratings.length; i++)
    total += +(ratings[i])
  return (total / ratings.length).toFixed(1)
}


fetch(URL + getParam)
  .then(response => response.json())
  .then(data => setData(data))

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
    document.getElementById('rating').innerText = average(recipeData.ratings)
  })
  .catch((err) => {
    console.error(err)
  })
}

const setData = (data) => {
  recipeData = data

  document.location.hash = data._id

  document.getElementById('title').innerText = data.title
  document.getElementById('food-photo').src = data.picture
  document.getElementById('amount').innerText = data.servings

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

  document.getElementById('rating').innerText = average(data.ratings)
}