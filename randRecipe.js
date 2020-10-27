const URL = 'https://3blzgwgi13.execute-api.us-west-2.amazonaws.com/Live/recipe'

const recipe_name = document.getElementById('recipe_name')
const recipe_desc = document.getElementById('recipe_desc')
const rand_img = document.getElementById('rand_img')
const instructList = document.getElementById('instructList')

const getRecipe = async () => {
  // use the fetch API to get data from
  // that URL, convert it to JSON, and
  // log it to the console
  fetch(URL)
  .then(response => response.json())
  //.then(data => console.log(data))
  .then(data => populateElements(data))
}

const populateElements = data => {
    recipe_name.innerText = data.title
    recipe_desc.innerText = data.desc
    rand_img.src = data.picture
    rand_img.height = "400"
    rand_img.width = "600"

    // Ingredients

    // Instructions
    let instructLength = data.instructions.length
    for (let x = 0; x < instructLength; x++){
      let z = document.createElement("LI")
      let y = document.createTextNode(data.instructions[x])
      z.appendChild(y)
      instructList.appendChild(z)
    }
}


getRecipe()