import React, { Component } from 'react';
import { Icon } from 'semantic-ui-react'

import { withRouter } from "react-router-dom";
import Cart from './Cart'

import 'semantic-ui-css/semantic.min.css'
import '../css/recipe.css';

class Recipe extends Component {
    constructor(props) {
        super(props);
        this.state = {  
            recipe: {},
            servingSize: 1,
            rating: "none",
        };
    }

    componentDidMount = () => {
        let recipe = ""
        if (this.props.random) {
            recipe = "random"
        }
        else {
            recipe = this.props.match.params.recipe
            let words = recipe.split("-").map(word =>  {
                return word.charAt(0).toUpperCase() + word.substr(1);
            })
            recipe = words.join(' ')
        }
        console.log(recipe)

        fetch('http://localhost:8000/api/recipe/' + recipe)
            .then((res) => {
                if (res.status === 400) {
                    throw new Error('your error message here');
                }
                return res.json();
            })
            .then(data => {
                this.setState({ recipe: data, servingSize: data.servings })
            })
            .catch(err => {
                console.log("recipe doesn't exist")
                const { history } = this.props;
                if (history) history.push("/")
            });
    }
    

    changeSize(amount) {
        let servingSize = this.state.servingSize
        if(servingSize + amount !== 0){
            this.setState({servingSize: servingSize + amount})
        }
    }

    avgRating = (ratings) => {
        var total = 0
        ratings.forEach(item => {
            let rating = Number(item)
            total += rating
        });
        return Math.round(total / ratings.length * 10) / 10
    }

    submitRating = () => {
        let rating = Number(this.state.rating);
        let recipe = this.state.recipe
        let id = recipe.title 
        recipe.ratings.push(rating)

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({rating: rating, id: id})
        };
        fetch('http://localhost:8000/api/rating', requestOptions)
            .then(this.setState({recipe: recipe, rating: "none"}))
    }

    handleChange = (e) => {
        this.setState({ rating: e.target.value });
      }

    render() {
        let { title, description, ingredients, instructions, ratings, servings, picture } = this.state.recipe
        let { servingSize, rating } = this.state
        let avgRating = ratings? this.avgRating(ratings): 1
        let ingredient_list = []
        for (var item in ingredients) {
            var amount = Math.round(ingredients[item] * servingSize / servings * 100) / 100 ;
            ingredient_list.push(<li key={item}>{amount===-1? "" : amount} {item}</li>)
        }
        return (
            <div className="master-page">
                <div class="recipe-page">
                    <div class="recipe-topbar">
                        <h1 class="recipe-title" id="title">{title}</h1>
                        <div id="rating-display">{avgRating}</div><Icon name='star' style={{marginTop: "15px", marginLeft: '3px'}}/>
                        <button onClick={() => this.props.addToCart(ingredients, servingSize/servings)} className='add-cart-btn'>Add to Cart</button>
                    </div>
                    <h4 class="recipe-description" id="description">{description}</h4>
                    <img class="recipe-image" id="image" alt="food" src={picture} />
                    <div class = "servings">
                        <h2>Servings:</h2>
                        <button onClick={() => this.changeSize(-1)}>-</button>
                        <div id="serving-size">{servingSize}</div>
                        <button onClick={() => this.changeSize(1)}>+</button>
                    </div>
                    <span class = "ratings">
                        <h2>Rate Me:</h2>
                        <select name="Ratings" value={rating} onChange={this.handleChange}>
                            <option value="none" selected disabled hidden>Select Rating</option> 
                            <option value="1">1 </option>
                            <option value="2">2 </option>
                            <option value="3">3 </option>
                            <option value="4">4 </option>
                            <option value="5">5 </option>
                        </select>
                        <button id="submit-rating" onClick={this.submitRating}>Submit</button>
                    </span>
                    <div class = "ingredients">
                        <h3>Ingredients</h3>
                        <ul id="ingredients">
                            {ingredient_list}
                        </ul>
                    </div>
                    <div class = "instructions">
                        <h3>Instructions</h3>
                        <ol id="instructions"> 
                            {instructions && instructions.map((item, key) => {
                                return <li key={key}>{item}</li>
                            })}
                        </ol>
                    </div>
                </div>
                <Cart cart={this.props.cart} emptyCart={this.props.emptyCart}/>
            </div>
        );
    }
}

export default withRouter(Recipe);