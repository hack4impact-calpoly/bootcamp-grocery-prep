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
	   const ingredients = this.state.ingredients;
	   
	   for (const i in ingredients){
	   	const ing = ingredients[i];   
	        
		for (const key in ing){
		   let count = ing[key];
		
		   count = +((count * newServings)).toFixed(2);
		   newIngredients[key] = count;
		}
	   }
	   this.setState({ ingredients : newIngredients, serving : newServings })
           
	}
  }

  addToCart() { this.state.updateCart(this.state.ingredients && this.state.ingredients[0]) }

  render () {
  console.log(this.state.ingredients && this.state.ingredients[0])
  return (
    <div className = 'Recipe'>
        
    	<h2>{this.state.title}</h2>
       
	<div class='addCart'>
	    <button id='addToCart' onClick={() => this.addToCart()}> Add To Cart </button>
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
		     	<li key={i}> {this.state.ingredients[0][item]} {item}  </li>
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
