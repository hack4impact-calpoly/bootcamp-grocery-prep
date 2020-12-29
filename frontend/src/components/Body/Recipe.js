import React, { Component } from 'react';
import './Recipe.css'

class Recipe extends Component {
    constructor(props) {
        super(props);
        this.state = { updateCart : props.updateCart };
    }

    componentDidMount() {
        const path = window.location.pathname.split('/')

        fetch('http://localhost:3001/api/recipe/' + path[2])
            .then(res => res.json())
            .then(data => this.setState({ ...data[0] }))
    }

    updateServings(newServing) {
        if (this.state.servings + newServing !== 0) {
            const currServings = this.state.servings
            const newServings = []
            for (const ingredient in this.state.ingredients) {
                const newIngredientObj = {}
                const ingredientText = Object.keys(this.state.ingredients[ingredient])[0]
                const currServing = Object.values(this.state.ingredients[ingredient])[0]
                if (currServing == 'null') {
                    newIngredientObj[ingredientText] = 'null'
                }
                else {
                    newIngredientObj[ingredientText] = +(((currServing / currServings) * (currServings + newServing)).toFixed(2)).toString();
                }
                newServings.push(newIngredientObj)
            }
            this.setState({ ingredients: newServings, servings: this.state.servings + newServing })
        }
    }

    avgRatings(ratings) {
        let sum = 0
        for (const i in ratings)
            sum += +(ratings[i])
        return (sum / ratings.length).toFixed(1)
    }

    postRating() {
        const ratingSelect = +(document.getElementById('recipe-select-rating').value)
        console.log(ratingSelect)

        if (!isNaN(ratingSelect)) {
            this.state.ratings.push(ratingSelect)
            console.log(this.state.ratings)

            document.getElementById('recipe-average-rating').innerText = this.avgRatings(this.state.ratings) +  ' ★'

            const data = {
                id: this.state.title,
                rating: ratingSelect
            }

            fetch('http://localhost:3001/api/rating', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
        }
    }

    addToCart() {
        this.state.updateCart(this.state.ingredients)
    }

    render () {
        const path = window.location.pathname.split('/')
        if (path.includes('random-recipe')) {
            document.title = 'Grocery Prep - Random Recipe'
        } else {
            document.title = 'Grocery Prep - ' + this.state.title
        }
        return (
            <div className='recipe-body'>
                <div className='recipe-content'>
                    <div className='recipe-header'>
                        <h1 id='recipe-name'>{this.state.title}</h1>
                        <div id='recipe-average-rating-and-add-to-cart-feature'>
                            <div id='recipe-average-rating'>
                                {this.state.ratings && this.avgRatings(this.state.ratings) + ' ★'}
                            </div>
                            <div className='recipe-add-to-cart-feature'>
                                <button id='recipe-add-to-cart-button' onClick={() => this.addToCart()}>Add to Cart</button>
                            </div>
                        </div>
                    </div>
                    <div className='recipe-bio'>
                        <div className='recipe-information'>
                            <div className='recipe-description'>{this.state.desc}</div>
                            <div className='recipe-portions'>
                                <h3>Servings</h3>
                                <button id='recipe-decrease' onClick={() => this.updateServings(-1)}>-</button>
                                <span id='recipe-serving-size'>{this.state.servings}</span>
                                <button id='recipe-increase' onClick={() => this.updateServings(1)}>+</button>
                            </div>
                            <div className='recipe-rating'>
                                <label for='recipe-select-rating' id='recipe-rating-label'>Rate Me!</label>
                                <div className='recipe-rating-feature'>
                                    <select id='recipe-select-rating'>
                                        <option selected hidden disabled>Select Rating</option>
                                        <option value='1'>1 ★</option>
                                        <option value='2'>2 ★</option>
                                        <option value='3'>3 ★</option>
                                        <option value='4'>4 ★</option>
                                        <option value='5'>5 ★</option> 
                                    </select>
                                    <button id='recipe-post-rating' onClick={() => this.postRating()}>Post Rating</button>
                                </div>
                            </div>
                        </div>
                        <div className='recipe-recipe-img'>
                            <img src={process.env.PUBLIC_URL + this.state.picture} id='recipe-recipe-image' alt={this.state.title + ' picture'} height='250px'/>
                        </div>
                    </div>
                    <div className="recipe-ingredients">
                        <div className="recipe-subheader">
                            <h2>Ingredients</h2>
                        </div>
                        <div className="recipe-ingredients-list">
                            <ul id="recipe-ingredients">
                                {this.state.ingredients && Object.keys(this.state.ingredients).map((item) => {
                                    return (
                                        <li key={item}>
                                            <span className='recipe-serving-count' base={Object.values(this.state.ingredients[item])}>
                                                { Object.values(this.state.ingredients[item]) != 'null' ? Object.values(this.state.ingredients[item]) + " " : "" }
                                            </span>
                                            {Object.keys(this.state.ingredients[item])}
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                        <div className="recipe-instructions">
                            <div className="recipe-subheader">
                                <h2>Instructions</h2>
                            </div>
                            <ol id="recipe-instructions">
                                {this.state.instructions && Object.keys(this.state.instructions).map((item) => {
                                    return (
                                        <li key={item}>
                                            <a className='recipe-instruction-step'>
                                                {Object.values(this.state.instructions[item])}
                                            </a>
                                        </li>
                                    );
                                })}
                            </ol>
                        </div>
                    </div>
                </div>
            </div> 
        );
    }
}

export default Recipe;