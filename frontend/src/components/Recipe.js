// JavaScript Document
import React from 'react';
import '../styles/recipes.css';
import { Link } from 'react-router-dom';

class Recipe extends React.Component {
	constructor(props) {
		super(props);
		this.state = { listOfRecipes:[]};
	}
	
	componentDidMount() {
		fetch('http://localhost:3001/api/recipe')
		.then(res => res.json())
		.then(allRecipes => this.setState({ listOfRecipes: allRecipes }));
	}
	
	render(){
		return (
			<div>
				<div className="recipe-flex">
				{this.state.listOfRecipes && this.state.listOfRecipes.map(recipe => {
					const id = recipe._id;
				 	const image = recipe.image;
					const food = recipe.food;
					return <div className="recipe-container">
								<div >
									<Link to={'individual/recipe/#' + id}>
										<img className="recipe-icon" src={image} alt={food}/>
										<div className="recipe-text">{food}</div>
									</Link>
								</div>
							</div>;
				})}
				</div>
			</div>
		);
	}
}

export default Recipe;