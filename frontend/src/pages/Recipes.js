// JavaScript Document
import React from 'react';
import Recipe from '../components/Recipe.js';
import Cart from '../components/Cart.js';
import '../styles/recipes.css';

class Recipes extends React.Component {
	constructor(props) {
		super(props);
	}
	
	render(){
		return (
			<div>
				<h1 className="box2">Recipes</h1>
				<div className="box3"></div>
				<div className="divider">
					<Recipe/>
					<Cart items={this.props.items} clearCart={this.props.clearCart}/>
				</div>
			</div>
	  );
	}
}
export default Recipes;
