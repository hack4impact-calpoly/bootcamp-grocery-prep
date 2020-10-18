const URL = 'https://3blzgwgi13.execute-api.us-west-2.amazonaws.com/Live/recipe'
let alldata;

const getRecipe = () => {
  fetch(URL)
    .then(response => response.json())
    .then(data => parseData(data))

    document.addEventListener('click', event => {
      if (event.target.id === 'post-rating')
        postRating()
    })
}

const parseData = (data) => {
  alldata = data;
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

  console.log(data)
  document.getElementById('rating').innerText = avgRatings(data.ratings)
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
    body: JSON.stringify(data)
  })
  .then(() => {
    alldata.ratings.push(rating)
    document.getElementById('rating').innerText = avgRatings(alldata.ratings)
  })
  .catch((err) => {
    console.error(err)
  })
}

const avgRatings = (ratings) => {
  console.log(ratings)
  console.log("hi")
  let sum = 0
  for (const i in ratings)
    sum += +(ratings[i])
  return (sum / ratings.length).toFixed(1)
}



getRecipe()