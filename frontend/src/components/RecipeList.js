import React from 'react';
import { Link } from 'react-router-dom';

import './RecipeList.css';

class RecipeList extends React.Component {
	constructor(props) {
		super(props);
		this.state = { list: [] };
	}
	
	componentDidMount() {
		fetch('http://localhost:3001/api/recipe')
		.then(res => res.json())
		.then(data => {
			this.setState({list : data})})
		
		document.title = 'My Favorite Recipes';
	}

	render() {
		return (
			<div id='recipe-list'>
				<h1>Welcome!</h1>

				<h2>Recipes</h2>
				<div className='link-collection'>
					{this.state.list && this.state.list.map(item => {
						const id = item._id;
						const title = item.title;

						return <Link to={'/recipe/#' + id}>{title}</Link>;
					})}
				</div>
			</div>
		);
	}
}

export default RecipeList;
