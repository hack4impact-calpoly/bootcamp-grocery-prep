import '../../css/Recipe.css';
import React from 'react';

class Recipe extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            updateCart: props.updateCart,
            rating: 0
        };
    }

    componentDidMount() {
        const id = window.location.hash.substr(1);
        fetch('http://localhost:3001/api/recipe/' + id)
        .then(res => res.json())
        .then(recipe => {
            this.setState({...recipe});
            let rating = recipe.ratings.reduce((a, b) => a + b) / recipe.ratings.length;
            rating = rating.toFixed(2);
            this.setState({rating: rating});
            document.title = recipe.title + 'A-MEAL-IA';
        });
    }

    getImage(name)
    {
        let image = require('./images/' + name);
        return image.default;
    }
    
    postRating() {
        const newRating = +(document.getElementById('select-rating').value);
        if (isNaN(newRating)) return;
        this.state.ratings.push(newRating);
        this.setState({ratings: [...this.state.ratings]});
        let rating = this.state.ratings.reduce((a, b) => a + b) / this.state.ratings.length;
        rating = rating.toFixed(2);
        this.setState({rating: rating});

        const ratingBody = {
            id: this.state._id,
            rating: newRating
        }

        fetch('http://localhost:3001/api/rating', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(ratingBody)
        });

    }

    updateCount(dir) {
        if (this.state.servings + dir <= 0) return;

        const currentServings = this.state.servings;
        const newCounts = [];
        let index = 0;
        for (const ingredients in this.state.ingredients) {
            const currentCount = +(this.state.ingredients[index][0]);
            let length = this.state.ingredients[index].length;
            let num = Number(((currentCount / currentServings) * (currentServings + dir)).toFixed(2)).toString();
            newCounts[index] = num + this.state.ingredients[index].slice(1, length);
            index++;
        }

        this.setState({ ingredients: newCounts, servings: this.state.servings + dir })
    }

    addToCart() {
        this.state.updateCart(this.state.ingredients);
    }

    render() {
        return (
            <div id='recipe'>
                <div>
                    <h1 id='title'>{this.state.title}</h1>
                    <p className='desc'>{this.state.desc}</p>
                        <div>
                            {this.state.picture && <img src= {this.getImage(this.state.picture)} height='250px'></img>}
                         </div>
                    <div id='actions'>
                        <div id='ratings'>
                            <span id='rating'>{this.state.rating}</span> &#9734;
                        </div>
                        &nbsp;
                    </div>
                </div>
                <div className='showcase'>
                    <div className='info'>
                        <div className='servings'>
                            <h3>Servings</h3>
                            <button onClick={() => this.updateCount(-1)}>-</button>
                            <span id='serving-count'>{this.state.servings}</span>
                            <button onClick={() => this.updateCount(1)}>+</button>
                        </div>
                        <div className='rating'>
                            <label id='rating-label' for='selecting-rating'>Rate Me!</label>
                            <br></br>
                            <select id='select-rating' defaultValue='none'>
                                <option value='none' disabled hidden>Select Rating</option>
                                <option value='1'>1 &#9733;</option>
                                <option value='2'>2 &#9733;</option>
                                <option value='3'>3 &#9733;</option>
                                <option value='4'>4 &#9733;</option>
                                <option value='5'>5 &#9733;</option>
                            </select>
                            
                            &nbsp;<button id='post-rating' onClick={() => this.postRating()}>Post Rating</button>
                        </div>
                    </div>
                </div>
                <button id='add-to-cart' onClick={() => this.addToCart()}>Add to Cart</button>
                <h2>Ingredients</h2>
                <ul>
                    {this.state.ingredients && Object.keys(this.state.ingredients).map((name) => {
                        return (
                        <div>
                            <li key={name}><span className='count'>{this.state.ingredients[name]}</span></li>
                        </div>);
                    })}
                </ul>
                <h2>Instructions</h2>
                <ol>
                    {this.state.instructions && this.state.instructions.map((instrction, count) => {
                        return <li key={count}>{instrction}</li>;})}
                </ol>
            </div>
        );
    }
}

export default Recipe;