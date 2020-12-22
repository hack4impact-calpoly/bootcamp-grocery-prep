import React from 'react';

import Styles from "./Recipe.module.css"

class Recipe extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            ratingAverage : Number,
            picturePath : String
        };
    }

    async componentDidMount(){
        const url = window.location.href;
        let tempString = "";
        let foodTitle = "";
        for (const index in url){
            if (tempString === "http://localhost:3000/recipe/"){
                foodTitle += url[index]
            }
            else{
                tempString += url[index];
            }
        }
        
        await fetch("http://localhost:3001/api/recipe/" + foodTitle)
        .then(res => {
            if (res.ok){
                return res
            }
            else{
                let error = new Error("ERROR AND I DON'T KNOW WHY!!!")
                throw(error)
            }
        })
        .then(res => res.json())
        .then(data => {
            const food = data[0]
            this.setState({...food});
            this.setState({
                origionalIngredients : this.state.ingredients
            })
        })
        .catch(err => console.log("Error!!!! : " + err));
    }

    findAverage(ratings){
        let total = 0;
        for (const rating in ratings){
            total += Number(ratings[rating]);
        }
        return (total / ratings.length).toFixed(2)
    }

    updateSize(direction){
        if (this.state.servingSize + direction < 1){return}
        let newIngredients = {};

        for (const ingredient in this.state.ingredients){
            const tempSize = this.state.ingredients[ingredient] + direction;
            newIngredients[ingredient] = tempSize
        }

        this.setState({
            servingSize : this.state.servingSize + direction,
            ingredients : newIngredients
        })
    }

    async postRating(){
        const selectedRating = Number(document.getElementById('select-rating').value);
        let tempRatings = this.state.ratings;
        tempRatings.push(selectedRating);

        const rating = {
            food : this.state.foodTitle,
            rating : selectedRating
        }

        await fetch("http://localhost:3001/api/rating",
        {
            method:"POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(rating)
        })
        .then(
            this.setState({
                ratings : tempRatings
            })
        )

    }

    render(){
        return(
            <main>
                <div>
                    <h1>{this.state.foodTitle}</h1>
                    <p>{this.state.foodDesc}</p>
                </div>
                <img src={process.env.PUBLIC_URL+"/../"+this.state.picturePath} height="200" width="150" alt=""></img>

                <div className={Styles.buttons}>
                    <button id="sub" onClick={() => this.updateSize(-1)}>-</button>
                    <span id="counter">{
                        this.state.servingSize
                    }</span>
                    <button id="add" onClick={() => this.updateSize(1)}>+</button>
                    <div>
                        <span>Rated: {
                            this.state.ratings && this.findAverage(this.state.ratings)
                        } Stars out of 5!</span>
                    </div>
                </div>
                <div>
                    <label htmlFor="select-rating" id="rating-label">Rate this dish!</label>
                    <select id="select-rating">
                        <option defaultValue hidden disabled>Select Rating</option>
                        <option value="1">1 &#x261C;</option>
                        <option value="2">2 &#x261C;</option>
                        <option value="3">3 &#x261C;</option>
                        <option value="4">4 &#x261C;</option>
                        <option value="5">5 &#x261C;</option>
                    </select>
                <button id="post" onClick={() => this.postRating()}>Post Rating</button>
                </div>
                <div>
                    <h1>Ingredients</h1>
                    <ul>
                        {this.state.ingredients && Object.keys(this.state.ingredients).map(ingredient => {
                            return <li key={ingredient}>{this.state.ingredients[ingredient] + " " + ingredient}</li>
                        })}
                    </ul>
                    <h1>Steps</h1>
                    <ol>
                        {this.state.instructions && this.state.instructions.map(step => {
                            return <li key={step}>{step}</li>
                        })}
                    </ol>
                </div>
            </main>
        )
    }
}

export default Recipe;