const URL = 'https://3blzgwgi13.execute-api.us-west-2.amazonaws.com/Live/recipe'


fetch(URL)
    .then(response => response.json())      // convert it to json 
    .then(data => displayData(data))




function displayData(data){
    const title = data.title
    const description = data.desc
    const ingredients = data.ingredients        //another json object
    const recipeImg = data.picture
    const instructions = data.instructions

    const descArea  = document.getElementById("desc")
    descArea.textContent = description

    const titleArea = document.getElementById("title")
    titleArea.textContent = title

    const instructionArea = document.getElementById("inst")
    instructionArea.textContent = instructions

    const imgArea = document.getElementById("imgSpot")
    imgArea.src = recipeImg

    const ingredientArea = document.getElementById("ingredientList")
     
    const count = 0
    for(i in ingredients){
        var node = document.createElement("LI")
        var text = document.createTextNode(i)
        var formatting = document.createTextNode(": ")
        
        node.appendChild(text)
        node.appendChild(formatting)
        
        var internalNode = document.createElement("span")
        var ammount = document.createTextNode(ingredients[i])
        internalNode.setAttribute("class", "counter")
        internalNode.setAttribute("ammount", ingredients[i])
        
        internalNode.appendChild(ammount)
        node.appendChild(internalNode)
        ingredientArea.appendChild(node)
        
    }
    
    //const newDiv = document.createElement("div")
    //newDiv.appendChild(description)
    //document.body.insertBefore(newDiv, document.getElementById("before"))


}