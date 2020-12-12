const url = 'https://3blzgwgi13.execute-api.us-west-2.amazonaws.com/Live/recipe'
var currData = {}

//mananaging when people press the post ratings
document.addEventListener('click', event => {
    if (event.target.id === 'post-rating') {
       callPost()
    }
 })

 //calling the post function 
 async function callPost() {
    let response = await postData({
        "id": currData._id,
        "rating": document.getElementById('select-rating').value
    })
}

//posting the new rating 
async function postData(ratingData = {}) {
    try {
        const response = await fetch(url, {
            method: 'POST', 
            body: JSON.stringify(ratingData) 
        });
        const jsonResponse = await response.json()
        console.log(jsonResponse)
        await getRecipeAfterPost()
        updateRatings()
    } catch (error) {
        console.error(err)
    }
   
}

const getRecipeAfterPost = () =>{
    fetch(url+'?id='+currData._id)
    .then(response => response.json())
    .then(newData => {
        console.log(newData)
        currData = newData;
    })
}

//geting random recipe from the API and storing it in the currData
const getRandomRecipe = () => {
    fetch(url)
    .then(response => response.json())
    .then(newData => {
        console.log(newData)
        currData = newData;
        setRecipeData()
    })
}
  
//setting and updating elements of the Recipe Page to match the random recipe 
const setRecipeData = () => {
    //updating recipe link
    updateLink()

    //updating recipe name
    const name = document.getElementById('recipeName')
    const updatedName = currData.title
    name.textContent = updatedName

    //updating the image
    const pic = document.getElementById('image')
    const updatedPic = currData.picture
    pic.src = updatedPic

    //updating ratings
    updateRatings()

    //updating ingredients
    const ingredients = document.getElementById('ingredients')
    const updatedIngredients = currData.ingredients
    for(const [currItem, amount] of Object.entries(updatedIngredients)){
        const newItem = document.createElement('li')  
        const itemInfo = document.createElement('span') 

        itemInfo.className = 'count'
        itemInfo.setAttribute('base', amount);
        itemInfo.innerText = amount

        //adding new element to the list with the data
        newItem.appendChild(itemInfo)  
        newItem.innerHTML += " " + currItem
        ingredients.appendChild(newItem)
    }
    
    //updating instructions
    const instructions = document.getElementById('instructions')
    const updatedInstruct = currData.instructions
    updatedInstruct.forEach(instruct => {
        const newInstruct = document.createElement('li')
        newInstruct.innerHTML = instruct
        instructions.appendChild(newInstruct)
    })

}

const updateLink = () => {
    var url = window.location.href   
    if (url.indexOf('#') === -1) {
        window.location.hash = currData._id
    }
    else if (window.location.hash != currData.id){
        window.location.hash = currData._id
    }
}

const updateRatings = () => {
    //updating the rating
    const avgrating = document.getElementById('avg-rating')
    const updatedRatings = currData.ratings
    avgrating.innerHTML = "&star; "  + calculateRatings(updatedRatings)
}

const calculateRatings = (dataRatings) => {
    let total = 0;
    for (const i in dataRatings)
        total += +(dataRatings[i])
    return (total / dataRatings.length).toFixed(1)
}

getRandomRecipe();