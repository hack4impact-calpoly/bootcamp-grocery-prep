const URL = 'https://3blzgwgi13.execute-api.us-west-2.amazonaws.com/Live/recipe'

const recipe_name = document.getElementById('recipe_name')
const recipe_desc = document.getElementById('recipe_desc')
const rand_img = document.getElementById('rand_img')
const ingredList = document.getElementById('ingredList')
const instructList = document.getElementById('instructList')

const getRecipe = async () => {
  // use the fetch API to get data from
  // that URL, convert it to JSON, and
  // log it to the console
  fetch(URL)
  .then(response => response.json())
  // .then(data => console.log(data))
  .then(data => populateElements(data))
}

const populateElements = data => {
    recipe_name.innerText = data.title
    recipe_desc.innerText = data.desc
    rand_img.src = data.picture
    rand_img.height = "400"
    rand_img.width = "600"

    // Ingredients
    let ingredLength = data.ingredients.length
    console.log(data.ingredients)
    for (let x1 = 0; x1 < ingredLength; x1++){
      let z1 = document.createElement("LI")
      let y1 = document.createTextNode(data.ingredients[x1])
      z1.appendChild(y1)
      ingredList.appendChild(z1)
    }

    // Instructions
    let instructLength = data.instructions.length
    for (let x2 = 0; x2 < instructLength; x2++){
      let z2 = document.createElement("LI")
      let y2 = document.createTextNode(data.instructions[x2])
      z2.appendChild(y2)
      instructList.appendChild(z2)
    }
}


getRecipe()