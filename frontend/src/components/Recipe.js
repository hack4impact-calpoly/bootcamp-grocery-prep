import React from 'react';
import './Recipe.css';

class Recipe extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			updateCart: props.updateCart,
		};
	}
	
	componentDidMount() {
		const url = window.location.href;
		var i;
		var name_ind;
		for (i = url.length-1; i >= 0; i--) {
			if(url[i] === '/'){
				name_ind = i+1;
				break;
			}
		}
		const title = url.substring(name_ind, url.length);

		fetch('http://localhost:3001/api/recipe/' + title)
		.then(res => res.json())
		.then(recipe => {
			this.setState({...recipe[0]});
			
			let rating;
			if(recipe[0].ratings.length === 0){
				rating = "NO RATING";
			} else{
				rating = recipe[0].ratings.reduce((a,b) => a+b) / recipe[0].ratings.length;
				rating = rating.toFixed(2);
			}
			this.setState({rating: rating});
			document.title = recipe[0].title + ' - My Favorite Recipes';
		});
	}

	postRating() {
		const newRating = +(document.getElementById('select-rating').value);
		if (isNaN(newRating)) return;

		this.setState({ratings: [...this.state.ratings, newRating]});
		let rating = this.state.ratings.reduce((a,b) => a+b) / this.state.ratings.length;
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

		const currentServings = +(this.state.servings);
		const newCounts = {};
		for (const ingredient in this.state.ingredients) {
			const currentCount = +(this.state.ingredients[ingredient]);
			newCounts[ingredient] = Number(((currentCount / currentServings) * (currentServings + dir)).toFixed(2)).toString();
		}
		this.setState({ ingredients: newCounts, servings: Number(this.state.servings) + Number(dir)})
	}
	
	render() {
		return (
			<div id='recipe'>
				<div className='headline'>
					<h1 id='title'>{this.state.title}</h1>
					<div id='actions'>
						<div id='ratings'>
							<span id='rating'>{this.state.rating}</span> &#9734;
						</div>
						&nbsp;
						//ADD ADD-TO-CART FUNCTIONALITY
						<button id='add-to-cart'>Add to Cart</button>
					</div>
				</div>
				<div className='showcase'>
					<div className='info'>
						<p className='desc'>{this.state.desc}</p>
						<div className='servings'>
							<h3>Servings</h3>
							<button onClick={() => this.updateCount(-1)}>-</button>
							<span id='serving-count'>{this.state.servings}</span>
							<button onClick={() => this.updateCount(1)}>+</button>
						</div>
						<div className='rating'>
							<label id='rating-label' for='selecting-rating'>Rate Me!</label>
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
					<img src={this.state.img} height='250px' alt={'Photo of ' 
						 + this.state.title}></img>
				</div>
				
				<h2>Ingredients</h2>
				<ul>
					{this.state.ingredients && Object.keys(this.state.ingredients).map((name) => {
						return <li key={name}><span className='count'>{this.state.ingredients[name]}</span> {name}</li>;
					})}
				</ul>

				<h2>Instructions</h2>
				<ol>
					{this.state.instructions && this.state.instructions.map((instruction, count) => {
						return <li key={count}>{instruction}</li>;
					})}
				</ol>
			</div>
		);
	}
}

export default Recipe;
						
				
