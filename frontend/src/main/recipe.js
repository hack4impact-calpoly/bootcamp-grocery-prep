import React from "react";

import './recipe.css';

class Recipe extends React.Component {
    constructor(props){
        super(props);
        this.state={
            updateCart: props.updateCart
        };
    }

    componentDidMount(){
        const id = window.location.hash.substr(1)
        fetch('http://localhost:3000/api/recipe/' + id)
            .then(res => res.json())
            .then(recipe => {this.setState({...recipe})
                var rating = (recipe.ratings.reduce((a,b) => a + b)/recipe.ratings.length).toFixed(2);
                this.setState({rating: rating})
                document.title = recipe.name
        });
    }

    postRatings = () =>{
        var selectedRating = document.getElementById("select-rating")
        var newRating = parseInt(selectedRating.options[selectedRating.selectedIndex].value)
        if(typeof newRating != "number" || newRating === 0){
            return
        }
        this.state.ratings.push(newRating)
        var rating = (this.state.ratings.reduce((a,b) => a + b)/this.state.ratings.length).toFixed(2);
        this.setState({rating: rating})
        
        const postData = {
            "id": this.state._id,
            "rating": newRating
        }
        fetch('http://localhost:3000/api/rating', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(postData)
        })
    }

    updateCount = dir => {
        if((dir < 0 && this.state.servings > 1) || (dir > 0)) {
            const currServings = this.state.servings
            const newAmount = {};
            for (const ingredient in this.state.ingredients){
                const currAmount = parseFloat(this.state.ingredients[ingredient])
                newAmount[ingredient] = String(((currAmount/currServings) * (currServings + dir)).toFixed(3))
            }
            this.setState({ingredients: newAmount, servings: this.state.servings + dir}) 
        }
        else{
            return
        }
    }

    addCart = () => {
        this.state.updateCart(this.state.ingredients)
    }    

    render(){
        return(
            <main>
                <h2>
                    <p id="title">{this.state.name}</p>
                    <p id="rating">{this.state.rating} ★</p>
                </h2>
                <p>{this.state.desc}</p>
                <img src={process.env.PUBLIC_URL + this.state.picture} alt=""></img>
                <h2>Ingredients</h2>
                <div class="servings">
                    <p>Servings:</p>
                    <button class="button minus" id="minus" onClick={() => this.updateCount(-1)}>-</button>
                    <span id="count" data-base="1">1</span>
                    <button class="button plus" id="plus" onClick={() => this.updateCount(1)}>+</button>
                </div>
                <ul>
                    {this.state.ingredients && Object.keys(this.state.ingredients).map((ingredient) => {
                        const amount = this.state.ingredients[ingredient]
                        return (
                        <li key={ingredient}>
                            <span class='amount' data-base={amount}>{amount}</span> {ingredient}
                        </li>
                        )})}
                </ul>
                <button class="button addcart" onClick={() => this.addCart()}>Add to Cart</button>
                <h2>Instructions</h2>
                <ol>
                    {this.state.instructions && this.state.instructions.map(instruction => {
                        return <li>{instruction}</li>
                    })}
                </ol>
                <div class="ratings" id="postRatings">
                    <label id="rating-label" for="select-rating">Rating:</label>
                        <select id="select-rating">
                            <option value="0" selected="" disabled="" hidden="">Select</option>
                            <option value="1">1 ★</option>
                            <option value="2">2 ★</option>
                            <option value="3">3 ★</option>
                            <option value="4">4 ★</option>
                            <option value="5">5 ★</option>
                        </select>
                    <button class="button submit" id="submitRatings" onClick={() => this.postRatings()}>Submit</button>
                </div>
            </main>
        )
    }
}

export default Recipe