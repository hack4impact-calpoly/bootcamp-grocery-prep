import './RandomRecipe.css'
import React from "react";
import { Redirect } from "react-router-dom";

class RandomRecipe extends React.Component {
 
  constructor(props){
	super(props);
	this.state = { RecipeList : [], redirect : '/random-recipe' };
  }  

  componentDidMount() {
  fetch('http://localhost:3001/api/recipe')
    .then(res => res.json())
    .then(data => this.setState({ RecipeList : data, redirect : this.URL() }));
  }
  
 
  randomNumGenerator = (num) => {
        return Math.floor(Math.random() * Math.floor(num));
  }


  URL = () => {
        let num = this.randomNumGenerator(this.state.RecipeList.length);
 
        if ( this.state.RecipeList && this.state.RecipeList[1]) {
        	let recipe = this.state.RecipeList;

        	this.setState({ redirect : '/random-recipe/' + recipe[num].title});
		return '/random-recipe/' + recipe[num].title;
	} 
	else {
		return '/random-recipe';
	 }
}

  render () {
  console.log(this.state.RecipeList)
  console.log(this.URL())
  console.log(this.state.redirect)
  return(

	<Redirect to={this.state.redirect} />
	//<div className='Random-Recipe'>
	//	<h2> hi </h2>
	//</div>
 
   );}
}

export default RandomRecipe;
