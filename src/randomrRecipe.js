const URL = "https://3blzgwgi13.execute-api.us-west-2.amazonaws.com/Live/recipe"
const title = document.getElementById("title")
const desc = document.getElementById("desc")
const pic = document.getElementById("pic")
const serv = document.getElementById("serving")
const steps = document.getElementById("steps")
const ingred = document.getElementById("ingredients")
let id = ""

const displayEasyText = (data) => {
   id = data["id"]
   title.innerText = data["title"]
   desc.innerText = data["desc"]
   pic.src = data["picture"]
   serv.innerText = data["servings"]
}

const displayInstructions = (data) => {
   for (let i = 0; i < data["instructions"].length; i++) {
      let step = document.createElement("li")
      step.innerText = data["instructions"][i]
      steps.appendChild(step)
   }   
}

const displayServings = (data) => {
   for (i in data["ingredients"]) {
      let food = document.createElement("li")
      if (data["ingredients"][i] === null)
         food.innerText = i
      else {
         let foodServing = document.createElement("span")
         foodServing.innerText = data["ingredients"][i]
         foodServing.classList.add("currServ") 
         let restOfFood = document.createElement("span")
         restOfFood.innerText = " " + i
         food.appendChild(foodServing)
         food.appendChild(restOfFood)
      }
      ingred.appendChild(food)
   }
}

const displayRecipe = (data) => {
   displayEasyText(data)
   displayInstructions(data)
   //this is where I found that there's a for each loop in JS!
   displayServings(data)
}

const getRecipe = () => {
   fetch(URL)
      .then(response => response.json())
      .then(data => displayRecipe(data))
}

getRecipe()