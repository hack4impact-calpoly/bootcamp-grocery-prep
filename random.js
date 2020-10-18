const URL = 'https://3blzgwgi13.execute-api.us-west-2.amazonaws.com/Live/recipe'


const getData = () =>{
  fetch(URL)
    .then(response => response.json())
    .then(data => recipe(data))
}

const recipe = (data) => {
  document.getElementById('title').innerText = data.title
  document.getElementById('food').src = data.picture
  document.getElementById('desc').innerText = data.desc
  document.getElementById('count').innerText = data.servings
  const t = Math.floor(Math.random() * Math.floor(30)) 
  document.getElementById('randomTime').innerText = t
  document.getElementById('randomTime2').innerText = t + 10
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
    document.getElementById('instruct').appendChild(item)
  })
  
  document.getElementById('rating').innerText = avgRatings(data.ratings)
}

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

const avgRatings = (ratings) => {
  let sum = 0
  for (const i in ratings)
    sum += +(ratings[i])
  return (sum / ratings.length).toFixed(1)
}

getData()
