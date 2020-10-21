const URL = "https://3blzgwgi13.execute-api.us-west-2.amazonaws.com/Live/recipe"
const title = document.getElementById("title")
const des = document.getElementById("des")
const servings = document.getElementById("count")
const ingredients = document.getElementById("ingredients")
const instructions = document.getElementById("instructions")
const image = document.getElementById("randomImage")
const rating = document.getElementById("rating")
var id = "bluh"

function getRecipe() {
   fetch(URL)
     .then(response => response.json())
     .then(function(data) {
        console.log(data.ratings)
        title.innerHTML = data.title
        des.innerHTML = data.desc
        var items = data.instructions

        for (var i = 0; i < items.length; ++i) {
           var li = document.createElement('li')
           li.appendChild(document.createTextNode(items[i]))
           instructions.appendChild(li)
        }

        for (var key in data.ingredients) {
           if (data.ingredients.hasOwnProperty(key)) {
              var li = document.createElement('li')
              li.appendChild(document.createTextNode(data.ingredients[key] + " " + key))
              ingredients.appendChild(li)
            }
        }

        var ratings = data.ratings
        var total = 0.0
        var count = 0.0

        for (var i = 0; i < ratings.length; i++) {
           total = total + ratings[i]
           count = count + 1
        }

        rating.innerHTML = (parseFloat(total/count).toFixed(1))
        image.src = data.picture
        id = data._id
     })
}

getRecipe()

function rateRecipe() {
   var rate = document.getElementById("rate")
   var curRating = rate.value
   var user= {
      "id" : id,
      "rating" : curRating
   }

   var xhr = new XMLHttpRequest()
   xhr.open("POST", URL, true)
   xhr.setRequestHeader('Content-Type', 'application/json')
   xhr.send(JSON.stringify(user))

   fetch(URL)
     .then(response => response.json())
     .then(function(data) {
        var ratings = data.ratings
        var total = 0.0
        var count = 0.0

        for (var i = 0; i < ratings.length; ++i) {
           total = total + ratings[i]
           count = count + 1
        }

        rating.innerHTML = (parseFloat(total/count).toFixed(1))
     })
}

