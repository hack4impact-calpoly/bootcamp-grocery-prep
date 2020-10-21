const param = window.location.hash.substring(1) !== undefined ? '?id=' + window.location.hash.substring(1) : null
const URL = 'https://3blzgwgi13.execute-api.us-west-2.amazonaws.com/Live/recipe'

// Get Request
fetch(URL + param)
  .then(response => response.json())
  .then(data => changeText(data))

let recipeData

const changeText = (data) => {
  recipeData = data
  document.location.hash = data._id
  document.getElementById('title').innerText = data.title
  document.getElementsByClassName('desc')[0].innerText = data.desc
  document.getElementById('photo').src = data.picture
  document.getElementById('serving-count').innerText = data.servings
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

  document.getElementById('my-rating').innerText = avgRatings(data.ratings)
}

//Post Request
document.addEventListener('click', event => {
  if (event.target.id === 'post-rating')
    postRating()
})

const postRating = () => {
  let myRating = document.getElementById('select-rating')
  const rating = +(myRating.options[myRating.selectedIndex].value)
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
    document.getElementById('my-rating').innerText = avgRatings() //update ratings after change
  })
}

function avgRatings() {
    var total = 0
    recipeData.ratings.forEach(item => {
        let rating = Number(item)
        total += rating
    });
    return Math.round(total / recipeData.ratings.length * 10) / 10
}