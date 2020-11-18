const recipeHash = window.location.hash.substring(1)
const getParam = recipeHash !== undefined ? '?id=' + recipeHash : null
const URL = 'https://3blzgwgi13.execute-api.us-west-2.amazonaws.com/Live/recipe'
let alldata;

const parseData = (data) => {
    alldata = data;
    document.location.hash = data._id
    document.getElementById('title').innerText = data.title;
    document.getElementById('desc').innerText = data.desc;
    document.getElementById('picture').src = data.picture;
    document.getElementById('count').innerText = data.servings;
    document.getElementById('rating').innerText = data.rating;
  
    const ingredients = document.getElementById('ingredients')
    for (const [key, value] of Object.entries(data.ingredients)) {
      const item = document.createElement('li')
      const count = document.createElement('span')
      count.className = 'amount'
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
  
    document.getElementById('rating').innerText = averageRatings(data.ratings)
}

const getRecipe = () => {
  fetch(URL + getParam)
    .then(response => response.json())
    .then(data => parseData(data))

    document.addEventListener('click', event => {
      if (event.target.id === "post-rating")
        postRating()
    })
}

const postRating = () => {
  const ratingSelect = document.getElementById('select-rating')
  const rating = +(ratingSelect.options[ratingSelect.selectedIndex].value)
  const data = {
    id: alldata._id,
    rating: rating
  }

  fetch(URL, {
    method: 'POST',
    body: JSON.stringify(data)})
  .then(() => {
    alldata.ratings.push(rating)
    document.getElementById('rating').innerText = averageRatings(alldata.ratings)})
}

const averageRatings = (ratings) => {
  let sum = 0
  for (const i in ratings)
    sum += +(ratings[i])
  return (sum / ratings.length).toFixed(1)
}
getRecipe() 