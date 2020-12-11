const url = "https://3blzgwgi13.execute-api.us-west-2.amazonaws.com/Live/recipe"
const addOn = window.location.hash === "#undefined" ? "": `?id=${window.location.hash.substring(1)}`
let recipeObj
let recipeId

const getRandomRecipe = async () =>{
	try{
		let response = await fetch(url + addOn)
		response = await response.json()
		console.log(response)
		setPage(response)
	} catch (err) {
		console.error(err)
	}
}

const setPage = recipe =>{
	recipeObj = recipe
	window.location.hash = recipe._id
	recipeId = recipe._id
	document.getElementById("title").innerText = recipe.title
	document.getElementById("image").src = recipe.picture
	document.getElementById("description").innerText = recipe.desc
	document.getElementById("avgRating").innerText = "Average Rating: " + setAverageRating() + " ☆"
	document.getElementById("count").innerText = recipe.servings
	setIngredientList()
	setInstructions()
}

const setAverageRating = () =>{
	const array = recipeObj.ratings
	let sum = 0;
	for(let i = 0; i < array.length; i++){
		sum += +(array[i])
	}
	return (sum/array.length).toFixed(1)
}

const setIngredientList = () =>{
	const ingredients = recipeObj.ingredients
	for (type in ingredients){
		const newIngredient = document.createElement("li")
		newIngredient.innerText = `${ingredients[type]} ${type}`
		document.getElementById("ingredientList").appendChild(newIngredient)
	}
}

const setInstructions = () =>{
	for(let j = 0; j < recipeObj.instructions.length; j++){
		const newInstr = document.createElement("li")
		newInstr.innerText = recipeObj.instructions[j]
		document.getElementById("instructions").appendChild(newInstr)
	}
}

document.addEventListener("click", event =>{
	if(event.target == document.getElementById("ratingSubmit")){
		const rating = document.getElementById("ratingBox").value
		if(rating === "Select Rating"){
			alert('"Select Rating" is not a valid rating. Please adjust your rating and try again.')
		}else{
			const data = {id: recipeId,	rating: +(rating)}
			console.log(data)
			fetch(url, {method: "POST", body: JSON.stringify(data)}).then(response => console.log(response.json()))
			recipeObj.ratings.push(+(rating))
			document.getElementById("avgRating").innerText = "Average Rating: " + setAverageRating() + " ☆"
		}
	}
})

getRandomRecipe()

