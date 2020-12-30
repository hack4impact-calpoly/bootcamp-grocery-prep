import React from 'react';
import './RecipeLinks.css';
import { Link } from 'react-router-dom';

//<a href={'/recipe/' + this.state[3].title}> this.state[3].title </a>
//                <a href={'/recipe/' + this.state[2].title}> this.state[2].title </a> 

class RecipeLinks extends React.Component {
  constructor(props){
	super(props);
	this.state = {RecipeList : []};
  }

  componentDidMount() {
  fetch('http://localhost:3001/api/recipe')
    .then(res => res.json())
    .then(data => this.setState({ RecipeList : data }));
  }

  render () {
    console.log(this.state);
    console.log(this.state[3] && this.state[3].title);
    return (
	<div className='RecipeLinks'>
	   
	   <h2>Recipes</h2>
	   
	   <body className='recipe-body'>

	   <h3 className='recipe-h3'> Food </h3>
	   <div className='links'>
		{ this.state.RecipeList && this.state.RecipeList.slice(2,4).map(item => {
		    return (
			<a href={'/recipe/' + item.title}> {item.title} </a>
		    );}
		)}
	   </div>
	
	   <h3 className='recipe-h3'> Dessert </h3>
	   <div className='links'>                                                      
                { this.state.RecipeList && this.state.RecipeList.slice(0,1).map(item => {
                    return (
                        <a href={'/recipe/' + item.title}> {item.title} </a>
                    );}
                )}
           </div>

	   <h3 className='recipe-h3'> Drinks </h3>
           <div className='links'>
                { this.state.RecipeList && this.state.RecipeList.slice(1,2).map(item => {
                    return (
                        <a href={'/recipe/' + item.title}> {item.title} </a>
                    );}
                )}
           </div>

	   </body>
	</div>
    );

  }

}

export default RecipeLinks;
