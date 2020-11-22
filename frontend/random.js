
var url = "https://3blzgwgi13.execute-api.us-west-2.amazonaws.com/Live/recipe"
let list
var recipe
var recipeId
var postButton

function getRecipe() {
    fetch(url)
    .then(response => recipe = response.json())
    .then(data => formatPage(data))
}

function formatPage(data) {
    document.getElementById("random-name").innerText = data.title
    document.getElementById("desc").innerText = data.desc
    document.getElementById("random-image").src = data.picture
    setAvgRating(data.ratings)
    list = document.getElementById("random-ul")
    for (i in data.ingredients) {
        var entry = document.createElement('li');
        var liDiv = document.createElement("div")
        liDiv.setAttribute("class", "serving-num")
        liDiv.innerText = data.ingredients[i]
        entry.appendChild(liDiv)
        entry.innerHTML += " " + i
        list.appendChild(entry);
    }
    list = document.getElementById("random-ol")
    for (i=0; i < data.instructions.length; i++) {
        var entry = document.createElement("li")
        entry.innerText = data.instructions[i]
        list.appendChild(entry)
    }
    recipeId = data._id
}

function setAvgRating(ratings) {
    let avg = 0
    for(i=0; i < ratings.length; i++) {
        avg += +(ratings[i])
    }
    avg = (avg / ratings.length).toFixed(1)
    console.log(avg)
    document.getElementById("ratings-avg").innerHTML = avg.toString() + " &starf;"
}

function postRating(recipeId) {
    var postValue = document.getElementById("random-rate").value
    var postData = {"id": recipeId, "rating": postValue}
    var newUrl = url + "?id=" + recipeId.toString()
    console.log(newUrl)
    fetch(newUrl, {method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify(postData)})
    fetch(newUrl)
    .then(response => response.json())
    .then(data => setAvgRating(data.ratings))
}

postButton = document.getElementById("postButton")
postButton.addEventListener("click", () => {postRating(recipeId)})

getRecipe()