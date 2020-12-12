import React from 'react';
import { Link } from 'react-router-dom';

import './RecipeList.css';

class RecipeList extends React.Component {
	constructor(props) {
		super(props);
		this.state = { list: [] };
	}

	render() {
		return (
			<div id='recipe-list'>
				<h1>Welcome!</h1>

				<h2>Recipes</h2>
			</div>
		);
	}
}

export default RecipeList;
