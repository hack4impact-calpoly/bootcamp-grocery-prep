import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import './RandomRecipe.css';

class RandomRecipe extends Component {
	randomRecipe(maxNum) {
		return Math.floor(Math.random() * Math.floor(maxNum))
	} 

	constructor(props) {
        super(props);
        this.state = { redirect : '/random-recipe' };
	}

	componentDidMount() {
        fetch('http://localhost:3001/api/recipe')
			.then(res => res.json())
			.then(data => this.setState({ redirect : '/random-recipe/' + data[this.randomRecipe(15)].title }))
	}
	
	render () {
		return (
			<Redirect to={this.state.redirect} />
		);
	}
}

export default RandomRecipe;