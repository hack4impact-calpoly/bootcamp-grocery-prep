// JavaScript Document
const URL = "https://3blzgwgi13.execute-api.us-west-2.amazonaws.com/Live/recipe"
const recipeHash = window.location.hash
console.log(recipeHash)
var realHash = ""
if(recipeHash !== undefined || recipeHash !== null){
	realHash = "?id=" + recipeHash.substring(1)
}

let data
const recipe = async () => {
	try{
		const response = await fetch(URL + realHash);
		const jsonResponse = await response.json();
		createHTML(jsonResponse)
		document.getElementById("rating1").appendChild(createRating(jsonResponse.ratings))
		document.location.hash = jsonResponse._id
		data = jsonResponse
	} catch(err){
		console.error(err)
	}
}
document.addEventListener('click', event => {
	if (event.target.id === 'submit') rating(data._id)
})

recipe();

const rating = async (id) => {
	const selector = document.getElementById('rating-value')
	const value = +(selector.options[selector.selectedIndex].value)
	const rate = {id: id,rating: value}
	try{
		const response = await fetch(URL, {method: 'POST', body: JSON.stringify(rate)})
		data.ratings.push(value)
		let counter = 0;
		for(var i in data.ratings){counter += (+(data.ratings[i]))}
		counter = Math.round(counter/i * 100) / 100
		document.getElementById('avgRating').innerHTML = "Rating: " + counter + " / 5";
	} catch(err){
		console.log(error)
	}	
}

const createHTML = (response) => {
	unorderedList = document.createElement('ul')
	for(var i in response.ingredients){
		ingredient = document.createElement('li')
		quantity = document.createElement('b')
		quantity.className = "quantity"
		quantity.innerHTML = response.ingredients[i]
		ingredient.innerHTML += quantity.outerHTML
		ingredient.innerHTML = ingredient.innerHTML + " " + i
		unorderedList.appendChild(ingredient)
	}
	document.getElementById("insertUL").appendChild(unorderedList)
	
	orderedList = document.createElement('ol')
	for(var i in response.instructions){
		instruction = document.createElement('li')
		instruction.innerHTML = response.instructions[i]
		orderedList.appendChild(instruction)
	}
	document.getElementById("insertOL").appendChild(orderedList)
	
	img = document.createElement('img')
	img.className = "recipe-page-display"
	img.src = response.picture
	document.getElementById("img-display").appendChild(img)
	document.getElementById("title").innerHTML = response.title
	document.getElementById("serving-size").innerHTML = response.servings
}

const createRating = (response) => {
	countHTML = document.createElement('div')
	countHTML.id = "avgRating"
	let counter = 0;
	for(var i in response){counter += (+(response[i]))}
	counter = Math.round(counter/i * 100) / 100
	countHTML.innerHTML = "Rating: " + counter + " / 5";
	countHTML.className = "rating"
	return countHTML
}