import React from 'react'
import './Recipe.css'

const url = 'http://localhost:8000/api/recipe/'

class Recipe extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            addToCart: props.addToCart,
        };

    }

    calculateRatings (dataRatings) {
        let total = 0;
        for (const i in dataRatings)
            total += +(dataRatings[i])
        return (total / dataRatings.length).toFixed(1)
    }

    componentDidMount(){
        const id = window.location.hash.substr(1);
        fetch(url + id)
        .then(response => response.json())
        .then(recipe => {
            this.setState({...recipe})
        
            let currRating = this.calculateRatings(recipe.ratings)
            this.setState({avgRating: currRating})
        });
    }

    updateRatings() {
        //updating the rating
        const avgrating = document.getElementById('avg-rating')
        const updatedRatings = this.state.ratings
        avgrating.innerHTML =  '★ '  + this.calculateRatings(updatedRatings)
    }

    //posting the new rating 
    postData() {

        const newRating = document.getElementById('select-rating').value
        this.setState({ratings: [...this.state.ratings, newRating]})
        let currRating = this.calculateRatings(this.state.ratings)
        this.setState({avgRating: currRating})

        const ratingData = {
            "rating": newRating,
            "id": window.location.hash.substr(1)
        }
        console.log(document.getElementById('select-rating').value)
        console.log(ratingData)
        try {
            fetch('http://localhost:8000/api/rating', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }, 
                body: JSON.stringify(ratingData) 
            });

            this.updateRatings()

        } catch (error) {
            console.error(error)
        }
   
    }

    updateCount(num) {
        const currServings = document.getElementById('serving-count');
        const updatedServings = Number(currServings.textContent) + num;
        
        if(updatedServings < 1) 
            return;
        currServings.textContent = updatedServings;
        this.updateIngredients(updatedServings);
    }
 
    updateIngredients(updatedServing){
        const ingredientCounts = document.getElementsByClassName('count');
        let i;
        for(i = 0; i < ingredientCounts.length; i++) {
            const itemServing = Number(ingredientCounts[i].getAttribute('base'));
            ingredientCounts[i].textContent = +(itemServing * updatedServing); 
        }  
    }

    addRecipeToCart() {
        console.log("Add to cart clicked")
        this.state.addToCart(this.state.ingredients)
    }

    render(){
        return (
            <section>
            <div id="RecipeHeader">
                <h1 id="recipeName"> {this.state.title} </h1>
                <h3 id="avg-rating"> ★ {this.state.avgRating} </h3> 
            </div>
            <button id="addCart" onClick={() => this.addRecipeToCart()}>Add to Cart</button>
            <p> </p>
            <br></br>
            <p> </p>
            <div id="BoxContainer">
                <div className="servings">
                    <p></p>
                    <h3>Servings</h3>
                    <button id="sub" onClick={() => this.updateCount(-1)} >-</button>
                    <span id="serving-count">1</span>
                    <button id="add" onClick={() => this.updateCount(1)}>+</button>
                    <h3>Rate Recipe!  </h3>
                    <div id="ratingStuff">
                        <select id="select-rating">
                        <option value="1"> ★ 1 </option>
                        <option value="2"> ★ 2 </option>
                        <option value="3"> ★ 3</option>
                        <option value="4"> ★ 4</option>
                        <option value="5"> ★ 5</option>
                        </select>
                        <button id="post-rating" onClick={() => this.postData()}>Post Rating</button>
                    </div>
                    <h3> Hope you enjoy :) </h3>
                </div>
                <img src={process.env.PUBLIC_URL + this.state.picture} id="image" height="300" alt={this.state.title + " picture"}/>
              </div>
              <h2> Ingredients </h2>
                <ul id="ingredients">
                    {this.state.ingredients && Object.keys(this.state.ingredients).map((item) => {
                        return <li key={item}><span className='count' base='1'>{this.state.ingredients[item]}</span> {item}</li>;
                    })}
                </ul>
               <h2> Instructions </h2>
                <ol id="instructions"> 
                    {this.state.instructions && Object.keys(this.state.instructions).map((instruct) => {
                        return <li key={instruct}>{this.state.instructions[instruct]}</li>
                    })}
                </ol> 
           </section>
        )
    }

}


 export default Recipe;
