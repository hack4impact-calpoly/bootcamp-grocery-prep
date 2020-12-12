const URL = 'https://3blzgwgi13.execute-api.us-west-2.amazonaws.com/Live/recipe'
const recipeHash = window.location.hash.substring(1)
const getParam = recipeHash !== undefined ? '?id=' + recipeHash : null

const recipe_name = document.getElementById('recipe_name')
const recipe_desc = document.getElementById('recipe_desc')
const rand_img = document.getElementById('rand_img')
const ingredList = document.getElementById('ingredList')
const instructList = document.getElementById('instructList')
const avgR = document.getElementById('rating')
let recipe_data

const getRecipe = async () => {
  // use the fetch API to get data from
  // that URL, convert it to JSON, and
  // log it to the console
  fetch(URL + getParam)
  .then(response => response.json())
  // .then(data => console.log(data))
  .then(data => {
    recipe_data = data
    populateElements(recipe_data)
  })
}


// For posting ratings
document.addEventListener('click', event => {
  // console.log(event.target.id)
  if (event.target.id === 'post') {
    postRating()
  }
}) 

const postRating = () => {
  const ratingSelect = document.getElementById('rating_options')
  const ratingWanted = +(ratingSelect.options[ratingSelect.selectedIndex].value)

  const packetData = {
    id: recipe_data._id,
    rating: ratingWanted
  }

  fetch(URL, {
    method: 'POST',
    body: JSON.stringify(packetData)
  })
  .then((x) => {
    recipe_data.ratings.push(ratingWanted)
    avgRatings()
    console.log(x)
  })
  .catch((err) => {
    console.error(err)
  })
}



// To fill our HTML
const populateElements = () => {
    document.location.hash = recipe_data._id

    console.log(recipe_data)
    recipe_name.innerText = recipe_data.title
    recipe_desc.innerText = recipe_data.desc
    rand_img.src = recipe_data.picture
    rand_img.height = "400"
    rand_img.width = "600"

    // Ingredients
    // console.log(ingred)
    for (const [key, value] of Object.entries(recipe_data.ingredients)) {
      let z1 = document.createElement("LI")
      let newSpan = document.createElement("span")
      newSpan.textContent = value
      newSpan.setAttribute('class', 'ingred')
      z1.appendChild(newSpan)
      let y1 = document.createTextNode(` ${key}`)
      z1.appendChild(y1)
      ingredList.appendChild(z1)
    }

    // Instructions
    let instructLength = recipe_data.instructions.length
    for (let x2 = 0; x2 < instructLength; x2++) {
      let z2 = document.createElement("LI")
      let y2 = document.createTextNode(recipe_data.instructions[x2])
      z2.appendChild(y2)
      instructList.appendChild(z2)
    }

    // Ratings
    avgRatings()

    // let sumRatings = 0;
    // for (let x3 = 0; x3 < recipe_data.ratings.length; x3++) {
    //   if (typeof recipe_data.ratings[x3] === "string")
    //   {
    //     sumRatings += parseInt(recipe_data.ratings[x3])
    //   }
    //   else
    //   {
    //     sumRatings += recipe_data.ratings[x3]
    //   }
    // }
    // let avgRatings = sumRatings/recipe_data.ratings.length
    // avgRatings = avgRatings.toFixed(1)
    // avgR.innerText = avgRatings
    // let z3 = document.createElement('span')
    // z3.textContent = avgRatings
    // avgR.appendChild(z3)
    // let y3 = document.createTextNode(' ☆')
    // avgR.appendChild(y3)
}

const avgRatings = () => {
  let sumRatings = 0;
    for (let x3 = 0; x3 < recipe_data.ratings.length; x3++) {
      if (typeof recipe_data.ratings[x3] === "string")
      {
        sumRatings += parseInt(recipe_data.ratings[x3])
      }
      else
      {
        sumRatings += recipe_data.ratings[x3]
      }
    }
    let avgRatings = sumRatings/recipe_data.ratings.length
    avgRatings = avgRatings.toFixed(1)
    avgR.innerText = avgRatings
    console.log(`Length: ${recipe_data.ratings.length}`)
    console.log(`Sum: ${sumRatings}`)
}

getRecipe()