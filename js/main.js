function redirect(){
	window.open("https://www.youtube.com/watch?v=oHg5SJYRHA0", '_blank');
}

var videoPlay = document.getElementById("hover-video");
videoPlay.addEventListener("click", redirect, false);


const recipeHash = window.location.hash.substring(1)
const getParam = recipeHash !== undefined ? '?id=' + recipeHash : null
const URL = 'https://3blzgwgi13.execute-api.us-west-2.amazonaws.com/Live/recipe'

var dataCompile;

const getRecipe = () => {
	fetch(URL + getParam)
	.then(response => response.json())
	.then(data => parseData(data))
}

const parseData = (data) => {
	dataCompile = data;
	document.location.hash = data._id;
	document.getElementById("title").innerText = data.title;
	document.getElementById("picture").src = data.picture;
	document.getElementById("servings").innerText = data.servings;
	document.getElementById("rating").innerText = avg(data.ratings);
	document.getElementById("full").style.width = (data.servings*10) + "%";
}

const avg = (ratings) => {
	let average = 0;
	for (let i = 0; i < ratings.length; i++)
		average += +(ratings[i])
	return parseFloat(average/ratings.length).toFixed(1);
}

document.addEventListener("click", event => {
	if (event.target.id === "sub")
		updateServings(-1);
	if (event.target.id === "add")
		updateServings(1);
	if (event.target.id === "star1")
		postRating(1);
	if (event.target.id === "star2")
		postRating(2);
	if (event.target.id === "star3")
		postRating(3);
	if (event.target.id === "star4")
		postRating(4);
	if (event.target.id === "star5")
		postRating(5);
})

const postRating = (rating) => {
	const data = {
		id: dataCompile._id,
		rating: rating
	}
	fetch (URL, {
		method: "POST",
		body: JSON.stringify(data)
	})
	.then(() => {
		dataCompile.ratings.push(rating)
		document.getElementById("rating").innerText = avg(dataCompile.ratings);
	})
	.catch((e) => {
		console.error(e);
	})
}

const updateServings = (num) => {
	if (-1 < Number(document.getElementById("servings").textContent) + num && Number(document.getElementById("servings").textContent) + num < 11) {
		document.getElementById("servings").textContent = Number(document.getElementById("servings").textContent) + num;
		document.getElementById("full").style.width = (Number(document.getElementById("servings").textContent)*10) + "%";
	}
	if ((Number(document.getElementById("servings").textContent)) > 8){
		document.getElementById("face").style.color = "green";
		document.getElementById("face").className = "fa fa-grin-hearts";
	} else if ((Number(document.getElementById("servings").textContent)) > 2) {
		document.getElementById("face").style.color = "orange";
		document.getElementById("face").className = "fa fa-meh";
	} else {
		document.getElementById("face").style.color = "red";
		document.getElementById("face").className = "fa fa-frown-open";
	}
	document.getElementById("face").style.fontSize = "15px";
	document.getElementById("face").style.transform = "translateY(-4.1px)";
	if (document.getElementById("servings").textContent == 10)
		alert("Wow! Prepare for a feast!")
	if (document.getElementById("servings").textContent == 0)
		alert("Dang, you'll regret it!")
}

getRecipe()
