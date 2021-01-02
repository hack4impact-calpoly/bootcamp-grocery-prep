import styles from './Recipe.module.css';
import React from 'react';

class Recipe extends React.Component {
    constructor(props) {
        super(props);
        this.state = 
        {
            refreshCart: this.props.refreshCart,
            rating: 0
        }
    }
    componentDidMount() {
        const id = window.location.hash.substr(1);
        const URL = 'http://localhost:3001/api/recipe/' + id;
        fetch(URL)
            .then(res => res.json())
            .then(recipe => {
                this.setState({ ...recipe});
                let rating = recipe[0].ratings.reduce((a, b) => a + b) / recipe[0].ratings.length;
                rating = rating.toFixed(2);
                this.setState({rating: rating});
                document.title = "Jillian's Recipes!";
        }); 
    }
    picturePath(picture)
    {
        let image = require('../../images/' + picture);
        return image.default;
    }
    addCart() {
        this.state.refreshCart(this.state[0].ingredients[0]);
    }

    postRating() {
        
        const ratingSelect = +(document.getElementById('select-rating').value);
        if (isNaN(ratingSelect)) return;
        let rating = (Number(this.state.rating) + ratingSelect)/2;
        rating = rating.toFixed(2);
        this.setState( {rating: rating});
        const data = {
            id: this.state[0]._id,
            rating: String(ratingSelect)
        }
        fetch('http://localhost:3001/api/rating', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
    }

    updateServings(amount)
    {
        
        if (!this.state[0] || (this.state[0].servings + amount <= 0)) return;
        const currentAmount = Number(this.state[0].servings);
        const newServings = {};
        for (const ingredient in this.state[0].ingredients[0])
        {
            const current = Number(this.state[0].ingredients[0][ingredient])
            let num = Number(((current / currentAmount) * (currentAmount + amount))).toFixed(2).toString(); 
            newServings[ingredient] = num
        }
        let oldState = this.state;
        oldState[0].ingredients[0] = newServings;
        oldState[0].servings = Number(this.state[0].servings) + amount;
        this.setState( {state: oldState });
    }

    picturePath(picture)
    {
        let image = require('../../images/' + picture);
        return image.default;
    }

    render() 
    {
        return (
            <div id='recipe'>
                <h1 id="title">{this.state[0] && this.state[0].title}</h1>
                <div class="desc">{this.state[0] && this.state[0].desc}</div>
                <div class="rating">
                        <div id="ratings"><span id="rating">{this.state.rating}</span> &#9733;
                            <label for="selecting-rating" id="rating-label"></label>
                            <select id="select-rating">
                                <option selected hidden disabled>Select Rating</option>
                                <option value="1">1 &#9733;</option>
                                <option value="2">2 &#9733;</option>
                                <option value="3">3 &#9733;</option>
                                <option value="4">4 &#9733;</option>
                                <option value="5">5 &#9733;</option>
                            </select>
                            <button className={styles.ratingButton} id="post-rating" onClick={() => this.postRating()}>Post Rating</button></div>
                        </div>
                    <div>
                        {this.state[0] && this.state[0].picture && <img src={this.picturePath(this.state[0].picture)} height='250px'/>}
                    </div>
                        <div class="serving-size">
                            <h4>Number of Servings:
                            <button className={styles.servingButton} onClick={() => this.updateServings(-1)}>-</button>
                            <span id="servings">{this.state[0] && this.state[0].servings}</span>
                            <button className={styles.servingButton} onClick={() => this.updateServings(1)}>+</button>
                        </h4>
                        </div>
                    <button id='addCart' className='button' onClick={() => this.addCart()}>Add Ingredients to Cart</button>
                    <h2>Ingredients</h2>
                    <ul id="ingredients">
                        {this.state[0] && Object.keys(this.state[0].ingredients[0]).map((name, size) => {
                            return (
                                <div>
                                    <li key={name}><span className='count'>{this.state[0].ingredients[0][name]} {name}</span></li>
                                </div>
                            );
                        })}
                    </ul>
                    <h2>Instructions</h2>
                    <ol id="instructions"> 
                        {this.state[0] && Object.keys(this.state[0].instructions).map((num, step) => {
                                return (
                                    <div>
                                        <li key={num}><span className='count'>{this.state[0].instructions[num]}</span></li>
                                    </div>
                                );
                        })}
                    </ol>
            </div>
        );
    }
}

export default Recipe;