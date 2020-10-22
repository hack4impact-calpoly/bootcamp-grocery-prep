let URL = "https://3blzgwgi13.execute-api.us-west-2.amazonaws.com/Live/recipe"
const title = document.getElementById("title")
const desc = document.getElementById("desc")
const pic = document.getElementById("pic")
const serv = document.getElementById("serving")
const steps = document.getElementById("steps")
const ingred = document.getElementById("ingredients")
const rating = document.getElementById("rating")
const currentHash = document.location.hash
let ratingArray = []
let id = ""

const displayEasyText = (data) => {
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

const addRatings = (data) => {
   for (i in data["ratings"]) {
      ratingArray.push(+data["ratings"][i])
   }
}
const displayRatings = (ratings) => {
   let avg = 0
   for (i in ratings) {
      avg += ratings[i]
   }
   avg /= ratings.length
   rating.innerText = Math.round(avg * 10) / 10
}

const displayRecipe = (data) => {
   id = data["_id"]
   document.location.hash = id
   displayEasyText(data)
   displayInstructions(data)
   //this is where I found that there's a for each loop in JS!
   displayServings(data)
   addRatings(data)
   displayRatings(ratingArray)
}

const getRecipe = () => {
   if (currentHash !== "") {
      URL += "?id="
      URL += document.location.hash.substr(1)
   }
   fetch(URL)
      .then(response => response.json())
      .then(data => displayRecipe(data))
}

getRecipe()

const postRating = () => {
   const newRating = +(document.getElementById("ratingDropdown").value)
   const newData = {id: id, rating: newRating}
   fetch(URL, {
      method: "POST",
      headers: {
         "Content-Type": "application/json"
      },
      body: JSON.stringify(newData)
   })
      .then(ratingArray.push(newRating))
      .then(displayRatings(ratingArray))
}

document.addEventListener("click", event => {
   if (event.target.id === "post") {
      postRating()
   }
})