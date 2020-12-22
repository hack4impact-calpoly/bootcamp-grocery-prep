// JavaScript Document

import React from 'react';
import '../styles/individualRecipe.css';
import Cart from '../components/Cart.js';
import Button from 'react-bootstrap/Button';

class IndividualRecipe extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			servings: 1,
			ratingVal: 0
		};
	}

	componentDidMount() {
		console.log(this.state.addToCart)
		fetch('http://localhost:3001/api/recipe/' + window.location.hash.substring(1))
			.then(res => res.json())
			.then(recipe => {const food = recipe[0]
							 let counter = 0
							 for(var i = 0; i < food.ratings.length; i++){
								 counter += food.ratings[i]
							 }
							 counter = Math.round(counter/food.ratings.length * 100)/100
							 this.setState({ratingVal:counter})
							 this.setState({ ...food })
							 });
	}
	

	handleSubtract() {
		if(this.state.servings - 1 > 0){
			this.setState({servings: this.state.servings - 1})
			this.handleAmounts(-1)}
	}
	
	handleAdd() {
		this.setState({servings: this.state.servings + 1})
		this.handleAmounts(1)
	}
	
	handleAmounts(val){
		var objects = this.state.ingredients
		for(var j = 0; j < this.state.ingredients.length; j++){
			var oldVal = Object.values(objects[j])[0]
			var newVal = (oldVal + oldVal / this.state.servings * val)
			objects[j][Object.keys(objects[j])[0]] = newVal
		}
		this.setState({ingredients:objects})
	}
	
	postRating(){
		const selector = document.getElementById('rating-value')
		const value = +(selector.options[selector.selectedIndex].value)
		var counter = 0
		var newStateArray = this.state.ratings
		newStateArray.push(value)
		this.setState({ ratings: newStateArray });
		for(var i in this.state.ratings){counter += (+(this.state.ratings[i]))}
		counter = Math.round(counter / this.state.ratings.length * 100)/100
	    this.setState({ratingVal:counter})
		const newRating = {id: this.state._id, rating: value}

		fetch("http://localhost:3001/api/rating", {method: 'POST', 
												   headers: {
												   'Content-Type': 'application/json'
            										},
												   body: JSON.stringify(newRating)});
	}
	
	cartChange() {
		this.props.addToCart(this.state.ingredients)
    }
	
	render(){
		return (
			<div>
				<h1 className="box2">{this.state.food}</h1>
				<div className="box3" />
				<div className="divider">
					<div>
						<div className="rating">Rating: {this.state.ratingVal} / 5</div>
						<div id="rating2" className="rating">
							
							<label htmlFor="rating">Post Rating: </label>
							<select className="posting-button" name="rating" id="rating-value">
								<option className="rating-dropdown-content" value="1">1 / 5</option>
								<option className="rating-dropdown-content" value="2">2 / 5</option>
								<option className="rating-dropdown-content" value="3">3 / 5</option>
								<option className="rating-dropdown-content" value="4">4 / 5</option>
								<option className="rating-dropdown-content" value="5">5 / 5</option>
							</select>
							<Button onClick={() => this.postRating()} id="submit" className="posting-button">Submit</Button>
						</div>
						<img className="recipe-page-display" src={this.state.image} alt={this.state.food}/>
						<div className="serving-size-display">
							<div id="serving-size-text">Serving Size: </div>
							<Button onClick={() => this.handleSubtract()} className="serving-button">-</Button>
							<div id="serving-size">{this.state.servings}</div>
							<Button onClick={() => this.handleAdd()} className="serving-button">+</Button>
						</div>
						<Button onClick={() => this.cartChange()} className="cart-button">Add To Cart</Button>
						<div className="recipe-instrutions-display">
							<div className="recipe-instructions-container">
							<p className="recipe-instructions-text">Ingredients</p>
							<div className="recipe-instructions-text2">
								<ul>
									{this.state.ingredients && this.state.ingredients.map((ingredient, index) => {
										return <li><b className="quantity">{Object.values(ingredient)[0] + " "}</b>{Object.keys(ingredient)[0]}</li>;
										})}
								</ul>
							</div>
							</div>
						</div>
						<div className="recipe-instructions-container">
							<p className="recipe-instructions-text">Instructions</p>
							<div className="recipe-instructions-text2">
								<ol>
									{this.state.instructions && this.state.instructions.map(instruction => {
										return <li>{instruction}</li>;
										})}
								</ol>
							</div>
						</div>
					</div>
					<Cart items={this.props.items} clearCart={this.props.clearCart} />
				</div>
			</div>
		);
	}
}

export default IndividualRecipe;
