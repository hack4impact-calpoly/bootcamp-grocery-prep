import React from 'react';
import './Recipe.css'
import { useState } from 'react';

class Recipe extends React.Component{
  constructor(props){
        super(props);
        this.state = { updateCart : props.updateCart };
  }


  componentDidMount() {
  	const url = window.location.pathname.split('/');
  	fetch('http://localhost:3001/api/recipe/' + url[2])
    	.then(res => res.json())
    	.then(data => this.setState({ ...data[0] }));
  }


  updateServings(dir) {
	const curServings = this.state.serving;
	//const newServings = curServings + dir;
        //this.state.serving = newServings;
	let newIngredients = {};
	

        if (curServings + dir > 0){
           //const curServings = this.state.serving;
           const newServings = curServings + dir;
	   console.log(newServings)
	   const ingredients = this.state.ingredients;
	   
	   for (const i in ingredients){
	   	const ing = ingredients[i];   
	        
		for (const key in ing){
		   let count = ing[key];
		
		   count = +(((count / curServings) * newServings)).toFixed(2);
		   newIngredients[key] = count;
		}
	   }
	   console.log(newIngredients)
	   this.setState({ ingredients : [newIngredients], serving : newServings })
           console.log(this.state.ingredients)
	}
  }

  addToCart() { 
	this.state.updateCart(this.state.ingredients && this.state.ingredients[0]); 
	console.log("added to cart")
	}

  updateRatings(ratings) {
     let sum = 0
     for (const i in ratings)
        sum += +(ratings[i])
     return (sum / ratings.length).toFixed(1)
  }

  postRating () {
     const ratingSelect = +(document.getElementById('select-rating').value);
     //const rating = +(ratingSelect.options[ratingSelect.selectedIndex].value);
     if (!isNaN(ratingSelect)) {
        this.state.rating.push(ratingSelect);
        document.getElementById('rating').innerText = this.updateRatings(this.state.rating);
     	
	const data = {
           id: this.state.title,
           rating: ratingSelect
     	}

    	fetch('http://localhost:3001/api/rating', {
           method: 'POST',
           headers: {
              'Content-Type': 'application/json'
           },
           body: JSON.stringify(data)
       	})
    }
}

  render () {
  console.log(this.state.ingredients && this.state.ingredients[0])
  return (
    <div className = 'Recipe'>
        
    	<h2>{this.state.title}</h2>
       
	<div class='addCart'>
	    <button id='addToCart' onClick={() => this.addToCart()}> Add To Cart </button>
	</div>	

        <div id="ratings">Rating: <span id="rating"> {this.state.rating && this.updateRatings(this.state.rating)} </span></div>
        <div class="rating">
			<label id="rating-label" for="select-rating"></label>
			<select id="select-rating">
				<option selected hidden disabled>Give me a rating!</option>
				<option value="1">1 </option>
				<option value="2">2 </option>
				<option value="3">3 </option>
				<option value="4">4 </option>
				<option value="5">5 </option>
			</select>

			<button id = "post-rating" onClick={() => this.postRating()}>Give Rating</button>
	</div>
 

	<div class='serving'>
	    <p> Serving </p>
	    <button id='minus' onClick={() => this.updateServings(-1)}> - </button>
	    <span id='serving-count'> {this.state.serving} </span>
	    <button id='plus' onClick={() => this.updateServings(1)}> + </button>
	</div>

	<p> Ingredients </p>
	   <ul>
		{ this.state.ingredients && Object.keys(this.state.ingredients[0]).map((item, i) => {
		     return (
		     	<li key={i}> 
				<span class='count' base={this.state.ingredients[0][item]}>
					{this.state.ingredients[0][item]}
				</span>
			  {item}  
			</li>
		);}
		)}
	   </ul>
	
	<p> Steps </p>
	    <ol>
		{ this.state.steps && this.state.steps.map((item, i) => {
		     return (
			<li key={i}> {this.state.steps[i]} </li>
		     );
		})}
	    </ol>
	
	
    </div>
  );}
}


export default Recipe;
