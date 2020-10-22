
const addIngredients = data =>{
    ingreds = Object.entries(data.ingredients);
    let list = document.createElement('ul')
    for(let i = 0; i<ingreds.length;i++){
        let amount = ingreds[i][1]
        let type = ingreds[i][0]
        item = document.createElement('li')
        num = document.createElement('span')
        num.className = 'amount'
        num.innerHTML = amount
        item.innerText = ' ' + type
        item.insertBefore(num, item.firstChild)
        list.appendChild(item)
    }
    document.getElementById('everything').appendChild(list)
}
const makeRecipe = data =>{
    document.getElementById('title').innerHTML = data.title;
    document.getElementById('desc').innerHTML = data.desc;
}
const setImage = data => {
    let img = document.createElement('img')
    img.setAttribute('src',data.picture);
    img.setAttribute("width", "350");
    img.setAttribute("height", "350");
    document.getElementById('everything').appendChild(img)
    
}
const randomRecipe = () => {
    fetch('https://3blzgwgi13.execute-api.us-west-2.amazonaws.com/Live/recipe')
        .then(response => response.json())
        .then(data =>{
            addIngredients(data)
            makeRecipe(data)
            setImage(data)
            document.getElementById('r').innerText = getAvg(data)
            getRating(data)
        })  
        .catch(err => console.log(err))  
}
const getAvg = data  =>{
    let sum = 0
    for(let i = 0; i < data.ratings.length; i++){
        sum += +(data.ratings[i])
    }
    let avg = +(Math.floor((sum/data.ratings.length*10))/10)
    return avg
}
const postRating = (data) =>{
    fetch('https://3blzgwgi13.execute-api.us-west-2.amazonaws.com/Live/recipe',{
   method: "POST",
   body: JSON.stringify({
       "id": data._id,
       "rating": rating
   })})
console.log('hello', data.ratings)}
const getRating = data => document.addEventListener('click',event =>{
    if(event.target.id === 'ratingButton'){
        let rating = document.getElementById('rating').value;
        if(rating >= 0 && rating <=5) {
             postRating(data)
        }
        else{
            alert('Please enter rating from 1-5')
            document.getElementById('rating').value = ''
        }
    }
})
randomRecipe()