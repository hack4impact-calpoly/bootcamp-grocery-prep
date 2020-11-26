const count = document.getElementById("count")
const ingredientList = document.getElementById("ingredientList").getElementsByTagName("li")

document.addEventListener("click", event =>{
	const prev = count.innerText
	if(event.target.id === "add"){
		updateCount(1)
	}
	if(event.target.id === "sub" && count.innerText > 1){
		updateCount(-1)
	}
	const curr = count.innerText
	updateIngredients(prev, curr)
}) 

const updateCount = dir => {
	count.innerText = +(count.innerText) + dir
}

const updateIngredients = (prev, curr) => {
	for(let i = 0; i < ingredientList.length; i++){
		const strings = ingredientList[i].innerText.split(" ")
		ingredientList[i].innerText = (+(strings[0])*curr/prev).toString() + " " + strings.splice(1).join(" ")
	}
}