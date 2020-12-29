import React, { Component } from 'react';
import './Home.css';
import Recipes from './../Body/Recipes.js'

class Home extends Component {
	constructor(props) {
        super(props);
        this.state = { updateCart : props.updateCart };
	}
	
	render () {
		return (
			<div className='home-content'>
				<div className='home-welcome'>
					<h1>Welcome to Grocery Prep</h1>
					<p>Your one stop shop for all things grocery and meal planning related.</p>
					<p>Feel free to check out some of the recipes below. I hope you enjoy!</p>
				</div>
				<div className='home-body'>
					<Recipes />
				</div>
			</div>
		);
	}
}

export default Home;